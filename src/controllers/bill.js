"use strict"

module.exports = {

	list: function (req, res) {
		global.qbo.findBills({}, function (err, bills) {
			if (err) {
				res.status(404).send();
			} else {
				res.status(200).send(bills);
			}
		})
	},

	read: function (req, res) {
		global.qbo.getBill(req.params.id, function (err, bill) {
			if (err) {
				res.status(404).send();
			} else {
				res.status(200).send(bill);
			}
		})
	},

	create: function (req, res) {
		global.qbo.createBill(req.body, function (err, bill) {
			if (err) {
				res.status(404).send();
			} else {
				res.status(200).send(bill);
			}
		})
	},

	update: function (req, res) {
		global.qbo.updateBill(req.body, function (err, bill) {
			if (err) {
				res.status(404).send();
			} else {
				res.status(200).send(bill);
			}
		})
	},

	remove: function (req, res) {
		global.qbo.deleteBill(req.params.id, function (err, bill) {
			if (err) {
				res.status(404).send();
			} else {
				res.status(200).send(bill);
			}
		})
	},

	bulkUpload: function (req, res) {
		Promise.all(req.body.map(item => {
			console.log('item', item)
			let bill = {
                "Line": [
                  {
                    "DetailType": "AccountBasedExpenseLineDetail", 
                    "Amount": item['Bill Total'], 
                    "Id": "1", 
                    "AccountBasedExpenseLineDetail": {
                      "AccountRef": {
                        "value": "7"
                      }
                    }
                  }
                ], 
                "VendorRef": {
                  "value": item['Vender Id']
                }
              }
			return new Promise((resolve,reject)=>{
				global.qbo.createBill(bill, function (err, bill) {
					if (err) {
						reject(err);
					} else {
						resolve(bill);
					}
				})
			})
		})).then(response=>{
			console.log('response', response )
			res.send()
		}).catch(err=>{
			console.log('err', err )
			res.status(500).send()
		})

	},

}