"use strict"

const QuickBooks = require('node-quickbooks')
const OAuthClient = require('intuit-oauth');

// Need to be refactored later
const clientId = "AB017daB5Gv4hiUCbhTZdPuVXFu84hCPO1kswMk7M01LjwEgfc"
const clientSecret = "aFFYbqYPEhnKTAZMUzye9ZTcUBDcm1Ny5HqCwxN3"
const oauthCode = "AB11603635787HxAOr3HK64T9cJYpMiFBnpgh0tLKYiSt9LiNa"
var oauthToken = "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..GSHqyAox-Pn4n0oVuLJ9_A.XfPnC7b6GhTtIWX6MYLnLhf5NuFRPHKcY8OZ84UF9Y8lEt2E5_zh25WIT19a3Ob-4BkNvR4o2Zmb77VBJMXAcXymmdGF4tSh_T3LN9OWUIgI3nmtiM3diTb_tNhfjUzDBq-iHeMTK7TNgTRFqrrFpQmvvME5Jqt9oQLnL3CtT0lpKjSqvKCkiKoNNWmEIx39-QHmVOubu-4fRG0j5VTNqIom9CLr1JBgurubCuacdDBv8FdZ0guuoUB0ff-l5fBmn75Eciv_f7JqHgSEtHWdO1o4T-UribyMsn5ofZ8K1Jl_zxE5uvkGRRIrIVNBp0TSzZR8CKmJwZiHPHyZ2toasfqCx6ixYo_nSJpPLH6lsbY44CY9lYb5xAmxCNTOHVQX2Ix0tUYcHAkYe1Ye0ezarR_dn9ztClAvIu3lVGDcVYfBcxJ0upgZDUS75MOW57RTni0eopFk_EbJ0OjJE0DSrfD3-SIEEN1mybVxdNR2N58el23yHc2LVc0pH_BN1QzhVnupCX_ifmew1Pk0Oajec95LJ0Mh2pbGXwIZ5gDeU5S7e8ZwgrTQ3TYxEUbgvfz1hyo7BFQucP_DRrp1aKh9mu5rIbuzLuadgf5WfbwSaMXRqqm-dqL81dF77-nWyhC9g7GPG1j-FMSOL8XwOcU1V522salf1bXyaSXDt5L4IvzNG1A-A2paKG48VckKuIhKUKRM_S0Q6O_3vtsCF9OiGOx3vPt6siadJ6rKDNQcbSOiCApVaNK54hiC-zpsXhcL4TfHOzjIdSBvEEI_r-WZn7WVvWmh5XVCyJQ9K3S9NSNVhMpHgSJ62jp00y-EAkN_nMleQXIpfkK8U5g9Iq0Ja88Xhdl4K6E-dL6QPvsDGm1fJ81nce25a6gcsGC35YWXL0TYKNs-TY24F4QMZUMAUQ.n-FaPcua2dRm2CjG1e2oHQ"
const realmId = "4620816365152329870"
const refreshToken = "AB11612361843RcQEeRhyQA2HCWpztUinTxRnNndBwHpHJEMQI"

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