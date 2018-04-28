const express = require('express');
const mongoose = require('mongoose');
const bp = require('body-parser');
const app = express();

const mongodb_uri = 'mongodb://admin:adminpass@ds251849.mlab.com:51849/placement-app';
mongoose.connect(mongodb_uri);

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

var indexRoute = require('./routes/index');
app.use('/',indexRoute);
app.use('/',express.static(__dirname+"/public_static"));

app.listen(8080,function() {
	console.log("Listening to http://localhost:8080");
})