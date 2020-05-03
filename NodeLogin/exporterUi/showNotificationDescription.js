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
        console.log(req.body);
        contractId = req.body.ContractId;
            sqlRequest.query(parse("SELECT  cn.Vegetable AS ExporterVegetables,  cn.Weight AS Weight, fm.Username AS name, cn.Comment AS comment, cn.EndDate AS EndDate  FROM dbo.Farmer AS fm JOIN dbo.Contract AS cn ON fm.id = cn.FarmId WHERE cn.Contractid = '%s' AND cn.Accepted = 'Yes' ",contractId),(err,rows) => {
                if(err){console.log(err);}
                else{

                for(c = 0; c < rows.rowsAffected[0]; c++){
                    message.push({Name:rows.recordset[c].name,Vegetable:rows.recordset[c].ExporterVegetables, Comment:rows.recordset[c].comment , Weight:rows.recordset[c].Weight, EndDate:rows.recordset[c].EndDate})
                }

                console.log(message)
                res.send(message);

             }
            });

    })
    return router;
  }