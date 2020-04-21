const express=require("express");
const app=express();
const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
const PORT=4000;
signupLogin=require("./signuplogin");
app.use('/',signupLogin());
exporterui=require("./exporterUi")
app.use('/',exporterui())
app.listen(PORT);
