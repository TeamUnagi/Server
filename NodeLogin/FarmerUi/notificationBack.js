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
        ContractId=req.body.Contractid
        name=[];
        sqlRequest.query(parse("SELECT C.Vegetable,C.Weight,C.Comment,C.EndDate,E.Number,E.Fullname FROM dbo.Contract as C JOIN dbo.Exporter as E ON C.ExId= E.id WHERE C.Contractid='%s' ", ContractId),(err, row)=>{
            if(err){console.log(err);}
            name.push({Vegetable:row.recordset[0].Vegetable,Weight:row.recordset[0].Weight,Comment:row.recordset[0].Comment,EndDate:row.recordset[0].EndDate,Number:row.recordset[0].Number,Name:row.recordset[0].Fullname})
            res.send(name);
        })
    })
    return router;
}