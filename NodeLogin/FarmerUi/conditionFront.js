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
        FarmerId=req.body.FarmerId
        sqlRequest.query(parse("SELECT * FROM dbo.Contract WHERE FarmId =%s AND Accepted='Yes' ", FarmerId),(err, row)=>{
            if(err){console.log(err);}
            message=[];
            Veges=[];
            for(var j=0;j<row.rowsAffected[0];j++)
            {
                if(j==0){message.push({Vegetable:row.recordset[j].Vegetable}); Veges.push(row.recordset[j].Vegetable)}
                if(!Veges.includes(row.recordset[j].Vegetable))
                {
                    Veges.push(row.recordset[j].Vegetable)
                    message.push({Vegetable:row.recordset[j].Vegetable})
                 }
            }
            if(row.rowsAffected[0]==0)
            {
                res.send({Vegetable:"No"})
            }
            else{
            res.send(message)}
        })
    })
    return router;
}