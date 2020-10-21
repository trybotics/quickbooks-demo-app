"use strict"

const QuickBooks = require('node-quickbooks')
const OAuthClient = require('intuit-oauth');

// Need to be refactored later
const clientId = "AB017daB5Gv4hiUCbhTZdPuVXFu84hCPO1kswMk7M01LjwEgfc"
const clientSecret = "aFFYbqYPEhnKTAZMUzye9ZTcUBDcm1Ny5HqCwxN3"
const oauthCode = "AB116032198473zgO61RQUTjPAY4CoeXUW3OPb8KvLHzpHCMih"
var oauthToken = "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..O4had1BGz_H8Pl3fkl6dXQ.Z33R6EJ8hlQadz9sYhAkYP1gaCaEZOT2FbEPNxFmoo1YBujoDwgkbh9TRGg2no5PKZ8WAO5gmx_LFTVEIFhmXXBMZj7lxm-avt6sD42r7ByADLlam_imbsMzobAMzMyp9rmzVYWGyYePDnSaMYjNI6uPYseu3ZVVcOsYCI_Hg6WxM6UinemHTwa2Fpc5oFD6KhG7U0wxS7ILB2JCDrUziDnmu1BvEvQUeTU3RnmMw5L8XN75fb_Tao9439sYoxpjXS4GYFy4GwXo0TbHGCWduvhihzCKyvby62Bza7o6eeOCA9i106GK0dfXfF4pfZ0izagfoo2yER-xlgnlWs9fUpRqHxL7L844dhHiOFAJERIDlLXyldvYogUGDGQ5ZV7fDwEzt0tnvBjOJkITbBJoAlNbB4hCw-eZlJ27Tmy94SjftG_-iGQ_jcTuUgKjidBez5cgB5s6WwN1EAa57-jAWdpb_aUXu0XtEWeMGhlg4KzfMDUY3Sx1fxJSrM24K19bWpqzvbE1EBWtFE1U40IfnzkEo-PAiy7_ifDEdQqSI86bZOM6mvfVUWxxQwqqo9Zc-Bz0w13Rc81eOmCJeQfBz4Wnw-fE8rxAnSycMzFYgoD6u9ZhXC5CwhUD1UPvPO7T51_738HUbJHCHMzAFEMAsiZhLSGlYGWDT6gZtIPwd9YigS7OP3aV8epZZwmX1QIBHNzRkVVl3hHuFR8IyeL8jGVeQZRcInax0YLcI9kIWpO8k1XVaN3EnQSG-jP6Ybz1CfbmEuWPIrVMqH4BwHVEDx5MCZeFX-mSZvFasTxV9zD32NEfyIebrU104Kfgp3PKdN58dnK0yoLcvmM4xJbGkLpISXmlP0R_Fe0xCZ-Abt27Pls1Oc9y9RJrbkufb2gg_g9gXsdxMD2Ft5RxuwGoNg.IZOId3lHaAAjt_pp5L4qNA"
const realmId = "4620816365152329870"
const refreshToken = "AB11611950326ATr4Y6vtmNUu02EPsTNWZOi3QY2QVOS2SaXUG"

const oauthClient = new OAuthClient({
    clientId: clientId,
    clientSecret: clientSecret,
    environment: 'sandbox',
    redirectUri: 'https://developer.intuit.com/v2/OAuth2Playground/RedirectUrl',
});

module.exports = {

	refreshAccessToken: function (req, res, next) {
        if (!oauthClient.isAccessTokenValid()) {
            oauthClient
                .refreshUsingToken(refreshToken)
                .then(function (response) {
                    let authResponse= response.getJson()
                    oauthToken = authResponse.access_token
                    console.log("oauthToken", oauthToken)
                    var qbo = new QuickBooks(clientId,
                        clientSecret,
                        oauthToken,
                        false, // no token secret for oAuth 2.0
                        realmId,
                        true, // use the sandbox?
                        false, // enable debugging?
                        null, // set minorversion, or null for the latest version
                        '2.0', //oAuth version
                        refreshToken);
                    global.qbo = qbo;
                    next()
                })
                .catch(function (e) {
                    console.error('The error message is :' + e.originalMessage);
                    console.error(e.intuit_tid);
                    res.status(401).send()
                });
        } else {
            next()
        }
	},

}