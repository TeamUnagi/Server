const express=require("express");
var mysql = require('mssql');
var dbconfig = require('C:\\Users\\Yeshan\\Documents\\unagiServergit\\ServerSideUnagi\\NodeLogin\\Database\\database.js'); 
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
        sqlRequest.query(parse("SELECT * FROM dbo.Contract WHERE Contractid ", ContractId),(err, row)=>{
            if(err){console.log(err);}
            for(var i=0;i<row.rowsAffected[0];i++)
            {
                name.push({Id:row.recordset[i].Contractid,Name:row.recordset[i].Fullname})
            }
            sqlRequest.query(parse("SELECT * FROM dbo.Contract WHERE Contractid ", ContractId),(err, rows)=>{
                if(err){console.log(err);}
                else{
                    
                }
            })
            res.send(name);
        })
    })
    return router;
}