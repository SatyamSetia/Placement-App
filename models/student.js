var mongoose = require("mongoose");
var { Schema } = mongoose;

var studentSchema = new  Schema({
	name: String,
	department: String,
	rollNo: Number,
	cgpa: Number
});

module.exports = mongoose.model('tb1student', studentSchema);