const Student = require('../models/student.js');
const Company = require('../models/company.js');
const logger = require('../logger');
const route = require('express').Router();
const validateStudent = require('../validators/student');
const validateCompany = require('../validators/company');
const ifAlreadyRegistered = require('../utils/index');

/*-- route for getting all students from database --*/
route.get('/students',(req, res) => {
	Student.find({}, function(err, students) {
		if(err) {
			logger.error(err);
			return err;
		}
		logger.info("students list loaded");
    	res.status(200).send(students);  
  	});
});

/*-- route for getting a students with particular ID from database --*/
route.get('/students/:id',(req, res) => {
	Student.find({_id: req.params.id}, function(err, student) {
		if(err) {
			logger.error(err);
			return err;
		}
		logger.info(`student with id: ${req.params.id} is loaded`);
    	res.status(200).send(student);  
  	});
});

/*-- route for adding a new student to database --*/
route.post('/addStudent', validateStudent(), (req, res) => {
	var student = new Student();

    student.name = req.body.name;
    student.department = req.body.department;
    student.rollNo = req.body.rollNo;
    student.cgpa = req.body.cgpa;

    student.save(function(err, student){
        if(err) return err;
        logger.info(`A new student ${student.name} added to database`)
        res.status(201).send(student); 
    });
});

/*-- route for removing a student from database --*/
route.delete('/removeStudent/:id',(req, res) => {
	Company.find({},function(err,companies) {
		companies.map(company => {
			newArr = company.students.filter(stuId => stuId!==req.params.id)
			Company.findOneAndUpdate({
				_id: company._id
			}, {
				$set: {
					students: newArr
				}
			}, {
				new: true
			}, function(err, company) {
				if(err) return err;
			})
		})
	})
	Student.remove({_id: req.params.id},function(err) {
		if(err) return err;
		logger.info(`A student with id:${req.params.id} is removed from database`)
		res.status(204).send();
	});
})

/*-- route for editing a student in database --*/
route.put('/editStudent/:id', validateStudent(), (req, res) => {
	Student.findOneAndUpdate({
		_id: req.params.id
	}, {
		$set: {
			name : req.body.name,
	    	department : req.body.department,
	    	rollNo : req.body.rollNo,
	    	cgpa : req.body.cgpa
		}
	}, {
		new: true
	}, function(err, student) {
		if(err) return err;
		logger.info(`A student with id:${req.params.id} is updated in database`)
		res.status(200).send(student);
	})
})

/*-- route for getting all campanies from database --*/
route.get('/companies',(req, res) => {
	Company.find({}, function(err, companies) {
		logger.info("companies list loaded");
    	res.status(200).send(companies);  
  	});
});

/*-- route for getting a company with particular ID --*/
route.get('/companies/:id',(req, res) => {
	Company.find({_id: req.params.id}, function(err, company) {
		logger.info(`A company with id:${req.params.id} is loaded`);
    	res.send(company);  
  	});
});

/*-- route for editing a company in database --*/
route.put('/editCompany/:id', validateCompany(), (req, res) => {
	Company.findOneAndUpdate({
		_id: req.params.id
	}, {
		$set: {
			name : req.body.name,
	    	profile : req.body.profile,
	    	openings : req.body.openings
		}
	}, {
		new: true
	}, function(err, company) {
		if(err) return err;
		logger.info(`A company with id:${req.params.id} is updated in database`)
		res.status(200).send(company);
	})
})

/*-- route for registering a new company --*/
route.post('/registerCompany', validateCompany() ,(req, res) => {
	var company = new Company();

    company.name = req.body.name;
    company.profile = req.body.profile;
    company.openings = req.body.openings;
    company.students = [];

    company.save(function(err, company){
        if(err) return err;
        logger.info(`A new company named ${req.body.name} registered`);
        res.status(201).send(company); 
    });
});

/*-- route for unregistering a company with particular ID --*/
route.delete('/unregisterCompany/:id', (req, res) => {
	Company.remove({_id: req.params.id},function(err) {
		if(err) return err;
		logger.info(`A company with id:${req.params.id} is removed`);
		res.status(204).send();
	});
})

/*-- route for registering a student for a company --*/
route.put('/registerStudent/:id', ifAlreadyRegistered(), (req, res) => {
	Company.findOneAndUpdate({
		_id: req.body.companyId
	}, {
		$push: {
	    	students : req.params.id
		}
	}, {
		new: true
	}, function(err, company) {
		if(err) return err;
		logger.info(`student with id: ${req.params.id} is registered for company with name: ${company.name}`)
		res.status(200).send(company);
	})
})

/*-- route for unregistering a student from a company --*/
route.put('/unregisterStudent/:id', (req, res) => {
	Company.findOneAndUpdate({
		_id: req.body.companyId
	}, {
		$pull: {
	    	students : req.params.id
		}
	}, {
		new: true
	}, function(err, company) {
		if(err) return err;
		logger.info(`student with id: ${req.params.id} is unregistered from company with name: ${company.name}`)
		res.status(200).send(company);
	})
})

module.exports = route;