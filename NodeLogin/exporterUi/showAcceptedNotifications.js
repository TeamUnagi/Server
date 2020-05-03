const express=require("express");
const router=express.Router();
var mysql = require('mssql');
var dbconfig = require('C:\\Users\\Yeshan\\Documents\\unagiServergit\\ServerSideUnagi\\NodeLogin\\Database\\database.js'); 
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
    router.post("/",(req,res) => {
      message=[];
        exportId = req.body.ExpoterId;
            sqlRequest.query(parse("SELECT   fm.Fullname AS Username, cn.Contractid AS Id FROM dbo.Farmer AS fm JOIN dbo.Contract AS cn ON fm.id = cn.FarmId WHERE cn.ExId = '%s' AND cn.Accepted = 'Yes' ",exportId),(err,rows) => {
                for(x = 0; x < rows.rowsAffected[0]; x++){
                    message.push({Name:rows.recordset[x].Username, Id:rows.recordset[x].Id})
                }
                res.send(message)
            })

    })
    return router;
  }