var bodyParser = require('body-parser')
var express = require("express");
var app = express();

app.use(bodyParser.json());

app.get('/postcodes', function (req, res) {
	res.status(200).send({ postcode: 'SW1A 1AA' })
});

app.post("/postcodes", function (req, res) {
	var postcode = req.body.postcode;

	res.status(200).send(postcode + " is stored")
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});

module.exports.getApp = app;