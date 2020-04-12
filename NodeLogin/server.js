const express=require("express");
const app=express();
var mysql = require('mssql');
var dbconfig = require('./Database/database');
const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
const PORT=4000;
/*exSign=require("./signuplogin/exportersign");
farmSign=require("./signuplogin/farmersign")
login=require("./signuplogin/loginuser")
app.use('/',exSign());
app.use('/',farmSign());
app.use('/',login())*/
signupLogin=require("./signuplogin");
app.use('/',signupLogin);
app.listen(PORT);
