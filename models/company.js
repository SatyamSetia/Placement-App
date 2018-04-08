var mongoose = require("mongoose");
var { Schema } = mongoose;

var companySchema = new  Schema({
	name: String
});

module.exports = restful.model('tb1company', companySchema);