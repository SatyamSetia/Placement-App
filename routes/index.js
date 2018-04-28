const Student = require('../models/student.js');
const route = require('express').Router();

route.get('/students',(req, res) => {
	Student.find({}, function(err, students) {
    // var userMap = {};

    // students.forEach(function(user) {
    //   userMap[user._id] = user;
    // });

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

module.exports = route;