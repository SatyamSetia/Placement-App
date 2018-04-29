var mongoose = require("mongoose");
var { Schema } = mongoose;

var companySchema = new  Schema({
	name: String,
	profile: String,
	openings: Number,
	students: [String]
});

module.exports = mongoose.model('tb1company', companySchema);