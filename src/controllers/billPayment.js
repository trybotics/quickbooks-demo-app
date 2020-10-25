"use strict"

module.exports = {

	list: function (req, res) {
		global.qbo.findBillPayments({}, function (err, bills) {
			if(err){
				res.status(404).send();
			} else {
				res.status(200).send(bills);
			}
		})
	},

	read: function (req, res) {
		global.qbo.getBillPayment(req.params.id, function (err, bill) {
			if(err){
				res.status(404).send();
			} else {
				res.status(200).send(bill);
			}
		})
	},

	create: function (req, res) {
		global.qbo.createBillPayment(req.body, function (err, bill) {
			if(err){
				res.status(404).send();
			} else {
				res.status(200).send(bill);
			}
		})
	},

	update: function (req, res) {
		global.qbo.updateBillPayment(req.body, function (err, bill) {
			if(err){
				res.status(404).send();
			} else {
				res.status(200).send(bill);
			}
		})
	},

	remove: function (req, res) {
		global.qbo.deleteBillPayment(req.params.id, function (err, bill) {
			if(err){
				res.status(404).send();
			} else {
				res.status(200).send(bill);
			}
		})
	},

}