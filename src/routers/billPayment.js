"use strict"

var express = require('express')
var router = express.Router()

var controller = require('../controllers/billPayment')
var Middleware = require('../helpers/middleware')
var QuickBooks = require("../helpers/quickBooks");

router.get(
    '/', 
	Middleware.checkUserIsAllowed,
	QuickBooks.refreshAccessToken,
	controller.list
)

router.get(
    '/:id', 
	Middleware.checkUserIsAllowed,
	QuickBooks.refreshAccessToken,
	controller.read
)

router.post(
	'/',
	Middleware.checkUserIsAllowed,  
	QuickBooks.refreshAccessToken,
	controller.create
)

router.put(
	'/',
	Middleware.checkUserIsAllowed,
	QuickBooks.refreshAccessToken,
	controller.update
)

router.delete(
	'/:id',
	Middleware.checkUserIsAllowed, 
	QuickBooks.refreshAccessToken,
	controller.remove
)

module.exports = router;