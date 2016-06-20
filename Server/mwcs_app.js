var express = require('express');
var app = express();
var fs = require('fs');
var mwcs = require('./mwcs_parser.js');

//route for first request
app.get('/', function (req, res) {
   res.sendFile('Frontend/index.html',{root: './'});
})

//client javascript request
app.get('/*.js', function (req, res) {
   res.sendFile('Frontend/'+req.originalUrl,{root: './'});
})

//css file request
app.get('/*.css', function (req, res) {
   res.sendFile('Frontend/css'+req.originalUrl,{root: './'});
})

// rest api for available months
app.get('/wages_months_list', function (req, res) {
	mwcs.getMonthsList(function(data){
		res.json(data);
	});
})

// rest API for wage calculation.
app.get('/wages/:month/:year', function (req, res) {
	mwcs.getMonthlyWages(req.params.month, req.params.year, function(data){
		res.json(data);
	});
})

// starting server
var server = app.listen(8085, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Monthly Wage calculation app listening at http://%s:%s", host, port);
})
