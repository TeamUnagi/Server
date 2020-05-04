const express=require("express");
var mysql = require('mssql');
var dbconfig = require('C:\\Users\\User\\Desktop\\unagiserver\\Server\\NodeLogin\\Database\\database.js'); 
const router=express.Router();
try
{
    mysql.connect(dbconfig.connection, (err) =>{
    if (err) console.log(err)
    global.sqlRequest=new mysql.Request();
    })
}
catch(err)
{
      console.log(err);
}
function parse(str) {
    var args = [].slice.call(arguments, 1),
        i = 0;
  
    return str.replace(/%s/g, () => args[i++]);
  }
  module.exports = () => {
    router.post("/",(req,res)=> {
        res=req.body.Res
        console.log(res)
        Cid=req.body.Contractid

        sqlRequest.query(parse("UPDATE dbo.Contract SET Accepted='%s',FarmerRead='Yes' WHERE Contractid='%s' ",res,Cid) , (err,row) => {
            if(err){console.log(err);}
            console.log("done")
        })
    })
    return router;
  }