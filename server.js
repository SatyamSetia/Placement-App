const express = require('express');
const bp = require('body-parser');
const app = express();

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

app.use('/',express.static(__dirname+"/public_static"));

app.listen(8080,function() {
	console.log("Listening to http://localhost:8080");
})