"use strict"

var express = require('express')
var router = express.Router()

var controller = require('../controllers/user')
var Middleware = require('../helpers/middleware')

// before authentication
router.get(
    '/authenticate/intuit', 
	Middleware.checkUserIsAllowed,
	controller.authenticateIntuit
)

// after authentication
router.get(
    '/authenticated/intuit', 
	Middleware.checkUserIsAllowed,
	controller.authenticatedIntuit
)

router.get(
    '/', 
	Middleware.checkUserIsAllowed,
	controller.list
)

router.get(
    '/:id', 
	Middleware.checkUserIsAllowed,
	controller.read
)

router.post(
	'/',
	Middleware.checkUserIsAllowed,
	controller.create
)

router.put(
	'/',
	Middleware.checkUserIsAllowed,
	controller.update
)

router.delete(
	'/:id',
	Middleware.checkUserIsAllowed,
	controller.remove
)

module.exports = router;