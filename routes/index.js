const Student = require('../models/student.js');
const Company = require('../models/company.js');
const logger = require('../logger');
const route = require('express').Router();
const validateStudent = require('../validator');

route.get('/students',(req, res) => {
	Student.find({}, function(err, students) {
		if(err) {
			logger.error(err);
			return err;
		}
		logger.info("students list loaded");
    	res.send(students);  
  	});
});

route.post('/addStudent', validateStudent(), (req, res) => {
	var student = new Student();

    student.name = req.body.name;
    student.department = req.body.department;
    student.rollNo = req.body.rollNo;
    student.cgpa = req.body.cgpa;

    student.save(function(err, student){
        if(err) return err;
        logger.info(`A new student ${student.name} added to database`)
        res.send(student); 
    });
});

route.delete('/removeStudent/:id',(req, res) => {
	Student.remove({_id: req.params.id},function(err) {
		if(err) return err;
		logger.info(`A student with id:${req.params.id} is removed from database`)
		res.send();
	});
})

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
		res.send(student);
	})
})

route.get('/companies',(req, res) => {
	Company.find({}, function(err, companies) {
		logger.info("companies list loaded");
    	res.send(companies);  
  	});
});

route.get('/companies/:id',(req, res) => {
	Company.find({_id: req.params.id}, function(err, company) {
		logger.info(`A company with id:${req.params.id} is loaded`);
    	res.send(company);  
  	});
});

route.post('/registerCompany',(req, res) => {
	var company = new Company();

    company.name = req.body.name;
    company.profile = req.body.profile;
    company.openings = req.body.openings;
    company.students = [];

    company.save(function(err, company){
        if(err) return err;
        logger.info(`A new company named ${req.body.name} registered`);
        res.send(company); 
    });
});

route.delete('/unregisterCompany/:id',(req, res) => {
	Company.remove({_id: req.params.id},function(err) {
		if(err) return err;
		logger.info(`A company with id:${req.params.id} is removed`);
		res.send();
	});
})

route.put('/registerStudent/:id', (req, res) => {
	Company.findOneAndUpdate({
		_id: req.body.companyId
	}, {
		$push: {
	    	students : req.params.id
		}
	}, {
		new: true
	}, async function(err, company) {
		if(err) return err;
		logger.info(`student with id: ${req.params.id} is registered for company with name: ${company.name}`)
		res.send(company);
	})
})

// function getStudentName(id) {
// 	 var name = "";
// 	 Student.findById(id, function(err, student) {
// 	 	name = student.name;
// 	 })

// 	 return name;
// }

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
		res.send(company);
	})
})

module.exports = route;