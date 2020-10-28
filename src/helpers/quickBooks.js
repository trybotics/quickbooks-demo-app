"use strict"

var QuickBooks = require('node-quickbooks')
var OAuthClient = require('intuit-oauth');
var config = require('../config');

global.oauthClient = new OAuthClient({
    clientId: config.intuit.clientId,
    clientSecret: config.intuit.clientSecret,
    environment: config.intuit.environment,
    redirectUri: config.intuit.redirectUri
});

module.exports = {

    refreshAccessToken: function (req, res, next) {
        if (!global.oauthClient.isAccessTokenValid()) {
            global.oauthClient
            .refreshUsingToken(config.intuit.refreshToken)
            .then(function (response) {
                let authResponse = response.getJson()
                let oauthToken = authResponse.access_token
                var qbo = new QuickBooks(
                    config.intuit.clientId,
                    config.intuit.clientSecret,
                    oauthToken,
                    false, // no token secret for oAuth 2.0
                    config.intuit.realmId,
                    true, // use the sandbox?
                    false, // enable debugging?
                    null, // set minorversion, or null for the latest version
                    '2.0', //oAuth version
                    config.intuit.refreshToken);
                global.qbo = qbo;
                next()
            })
            .catch(function (error) {
                console.error('The error message is :', error);
                res.status(401).send()
            });
            
        }
    },

    createToken: function (url) {
        return global.oauthClient.createToken(url)
            .then(function (authResponse) {
                let response = authResponse.getJson();
                config.setValue({
                    accessToken: response.access_token,
                    refreshToken: response.refresh_token,
                    ...response
                })
                global.oauthClient = new OAuthClient({
                    clientId: config.intuit.clientId,
                    clientSecret: config.intuit.clientSecret,
                    environment: config.intuit.environment,
                    redirectUri: config.intuit.redirectUri,
                    state: config.intuit.state,
                    grant_type: config.intuit.grant_type,
                    code: config.intuit.code,
                    realmId: config.intuit.realmId,
                    accessToken: config.intuit.accessToken,
                    access_token: config.intuit.access_token,
                    refreshToken: config.intuit.refreshToken,
                });
            })
            .catch(function (error) {
                console.error("The error message is :", error);
            });
    },

    authorizeUri: function () {
        return global.oauthClient.authorizeUri({
            scope: [
                OAuthClient.scopes.Accounting,
                OAuthClient.scopes.OpenId,
                OAuthClient.scopes.Payment,
                OAuthClient.scopes.Profile,
                OAuthClient.scopes.Email,
                OAuthClient.scopes.Phone,
                OAuthClient.scopes.Address
            ],
            state: config.intuit.state,
        });
    }

}