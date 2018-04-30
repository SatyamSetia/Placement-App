const Company = require('../models/company.js');
const logger = require('../logger');

function ifAlreadyRegistered() {
	return function(req,res,next) {
		Company.find({_id: req.body.companyId}, function(err, company){
			if(company[0].students.indexOf(req.params.id)>0){
				logger.error('Student is already registered to this company.');
				res.status(400).send('ERROR: Student already registered to this company');
			} else {
				next();
			}
		})
	}
}

module.exports = ifAlreadyRegistered;