"use strict"

module.exports = {

	checkUserIsAllowed: function (req, res, next) {
		if (true) {
            next()
        } else {
            res.status(401).send()
        }
	},

}