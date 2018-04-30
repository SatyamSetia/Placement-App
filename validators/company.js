const validator = require('validator');
const logger = require('../logger');

/*-- function for validating company details --*/
function validateCompany() {
	return function(req, res, next) {
		if(validator.isEmpty(req.body.name)) {
			logger.error('company cannot be created without name');
			res.status(400).send('ERROR: name cannot be empty');
		} else if(validator.isEmpty(req.body.profile)) {
			logger.error('company cannot be created without profile');
			res.status(400).send('ERROR: profile cannot be empty');
		} else if(!validator.isInt(req.body.openings, {min: 1})) {
			logger.error('company cannot be created with less than 1 opening');
			res.status(400).send('ERROR: openings should be more than 0');
		} else {
			next();
		}
	}
}

module.exports = validateCompany;