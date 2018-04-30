const validator = require('validator');
const logger = require('../logger');

function validateStudent() {
	return function(req,res,next) {
		if(validator.isEmpty(req.body.name)){
			logger.error('student cannot be created without name');
			res.status(400).send('ERROR: name cannot be empty');
		} else if(validator.isEmpty(req.body.department)) {
			logger.error('student cannot be created without department');
			res.status(400).send('ERROR: department cannot be empty');
		} else if(!validator.isInt(req.body.rollNo,{min: 1})) {
			logger.error('student cannot be created without roll no. or negative roll no.');
			res.status(400).send('ERROR: roll no. cannot be empty or less than one');
		} else if(!validator.isInt(req.body.cgpa,{min: 0})) {
			logger.error('student cannot be created with invalid cgpa');
			res.status(400).send('ERROR: cgpa cannot be empty or negative. It should be a non-negative integer.');
		} else {
			next();
		}
	}
}

module.exports = validateStudent;