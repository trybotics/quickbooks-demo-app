"use strict"

var QuickBooks = require("../helpers/quickBooks");
var config = require('../config');

module.exports = {

    // AuthorizationUri
    authenticateIntuit: function (req, res) {
        let redirectURL = QuickBooks.authorizeUri()
        res.send({ redirectURL: redirectURL })
    },

    authenticatedIntuit: function (req, res) {
        config.setValue(req.query)
        QuickBooks.createToken(config.apiURL+req.originalUrl).then((data)=>{
            res.redirect(config.apiURL+'?authenticatedIntuit=true')
        }).catch((error)=>{
            console.log('error', error)
        })
        
    },

    list: function (req, res) {
        res.status(200).send();
    },

    read: function (req, res) {
        res.status(200).send();
    },

    create: function (req, res) {
        res.status(200).send();
    },

    update: function (req, res) {
        res.status(200).send();
    },

    remove: function (req, res) {
        res.status(200).send();
    },

}