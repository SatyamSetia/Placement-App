const Student = require('../models/student.js');
const Company = require('../models/company.js');
const route = require('express').Router();

route.get('/students',(req, res) => {
	Student.find({}, function(err, students) {
    	res.send(students);  
  	});
});

route.post('/addStudent',(req, res) => {
	var student = new Student();

    student.name = req.body.name;
    student.department = req.body.department;
    student.rollNo = req.body.rollNo;
    student.cgpa = req.body.cgpa;

    student.save(function(err, student){
        if(err) return err;
        res.send(student); 
    });
});

route.delete('/removeStudent/:id',(req, res) => {
	Student.remove({_id: req.params.id},function(err) {
		if(err) return err;
		res.send();
	});
})

route.put('/editStudent/:id', (req, res) => {
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
		res.send(student);
	})
})

route.get('/companies',(req, res) => {
	Company.find({}, function(err, companies) {
    	res.send(companies);  
  	});
});

route.get('/companies/:id',(req, res) => {
	Company.find({_id: req.params.id}, function(err, company) {
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
        res.send(company); 
    });
});

route.delete('/unregisterCompany/:id',(req, res) => {
	Company.remove({_id: req.params.id},function(err) {
		if(err) return err;
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
	}, function(err, company) {
		if(err) return err;
		res.send(company);
	})
})

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
		res.send(company);
	})
})

module.exports = route;