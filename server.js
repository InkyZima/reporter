/*
(single page app. one static page for all reports. multiple routes which all map to index.html, only with different data)
user story:
visit /leadmanagement
get prompted for user/pw (if currect -> ajax call for data)
(dev step 1:) see a/multiple (predefined pivot) tables with relevant data

services:
loadXlsxIntoDb: xlsx -> sql.db: data + config gets loaded into sql.db from xlsx file
	xlsx decomposition, checks, xlsx to csv, check encoding, csv to sql
	server.js keeps sql.db up to date. i.e. if xlsx changes, loadXlsxIntoDb gets called
user-UI/html file: vue-infused html file ready for pivot library
client-side js
auth
server.js
	routes with args handlers, e.g. /index.html, /leadmanagement, /KPI, .. they all serve static index.html
client-server ajax communication
*/

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
var sqlite = require("sqlite3");
var $ = jQuery = require('jquery');
require('./jquery.csv.js');
var XLSX = require('xlsx');

const c = console.log;
var db = new sqlite.Database("main.db");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("static"));
app.listen(80, () => console.log("running"));


/*
client submits form
ajax post request to /thedata 
form gets auth-validated
sql call for data, data served as json

client then uses the obj to load pivottable
*/
app.post("/thedata", auth, (req, res) => {
	// working sqlite example
	db.all("SELECT * from leadmanagement WHERE dealer=?", req.body.nameuser, (err,data) => {
		if(err) c(err);
		res.send(data);
	});	
	
	/* xlsx example */
	// c(req.body);
	// res.send(jsondata); 
});

function auth (req,res,next) {
	if (req.body.nameuser && req.body.namepass) {
		var user = req.body.nameuser;
		var pass = req.body.namepass;
		db.get("SELECT user,password FROM users WHERE user=?" , user , (err, sqlres) => {
			if (err) {c("sql request for auth failed."); res.send("sql request for auth failed.");}
			else {
				c(sqlres);
				if (sqlres.password === pass) next();
				else {
					c("user/pw pair not in db or mismatch. user: " + sqlres.user);
					res.send("user/pw pair not in db or mismatch. user: " + sqlres.user);
				}
			}
		});
	} else res.send("user or pass empty.");
	// res.send(req.body);
}
