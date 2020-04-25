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
        FarmerId=req.body.FarmerId
        ExName=[];
        sqlRequest.query(parse("SELECT * FROM dbo.Contract WHERE FarmId =%s AND Accepted='Yes' ", FarmerId),(err, row)=>{
            if(err){console.log(err);}
            message=[];
            for(var j=0;j<row.rowsAffected[0];j++)
            {
                if(!message.includes(row.recordset[j].Vegetable))
                message.push({Vegetable:row.recordset[j].Vegetable})
            }
            res.send(message)
        })
    })
    return router;
}