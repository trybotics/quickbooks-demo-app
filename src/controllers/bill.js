"use strict"

module.exports = {

	list: function (req, res) {
		global.qbo.findBills({}, function (err, bills) {
			if(err){
				res.status(500).send();
			} else {
				res.status(200).send(bills);
			}
		})
	},

	read: function (req, res) {
		global.qbo.getBill(req.params.id, function (err, bill) {
			if(err){
				res.status(500).send();
			} else {
				res.status(200).send(bill);
			}
		})
	},

	create: function (req, res) {
		global.qbo.createBill(req.body, function (err, bill) {
			if(err){
				res.status(500).send();
			} else {
				res.status(200).send(bill);
			}
		})
	},

	update: function (req, res) {
		global.qbo.updateBill(req.body, function (err, bill) {
			if(err){
				res.status(500).send();
			} else {
				res.status(200).send(bill);
			}
		})
	},

	remove: function (req, res) {
		global.qbo.deleteBill(req.params.id, function (err, bill) {
			if(err){
				res.status(500).send();
			} else {
				res.status(200).send(bill);
			}
		})
	},

}