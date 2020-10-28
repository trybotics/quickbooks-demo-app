var express = require('express')
var router = express.Router()

router.use('/user', require('./user'))
router.use('/bill', require('./bill'))
router.use('/billPayment', require('./billPayment'))

module.exports = router;