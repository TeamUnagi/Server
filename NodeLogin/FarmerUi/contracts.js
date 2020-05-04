const express=require("express");
const router=express.Router();
var mysql = require('mssql');
var dbconfig = require('C:\\Users\\User\\Desktop\\unagiserver\\Server\\NodeLogin\\Database\\database.js'); 
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
        console.log("came here")
          farmerId = req.body.FarmerId

                     message=[];
                  sqlRequest.query(parse("SELECT ex.Fullname AS ExporterName, cn.Vegetable AS ExporterVegetables, cn.Contractid AS ContractId FROM dbo.Exporter AS ex JOIN dbo.Contract AS cn ON ex.id = cn.ExId WHERE cn.FarmId = '%s' AND cn.Accepted = 'Yes' ",farmerId )  , (err, row) => {
                      if(err){console.log(err);}
                      else{

                        for(c = 0; c < row.rowsAffected[0]; c++){  
                          message.push({contractId:row.recordset[c].ContractId , Name : row.recordset[c].ExporterName ,  Vegetables:row.recordset[c].ExporterVegetables})
                        }  
                        if(row.rowsAffected[0]==0)
                        {
                          res.send({contractId:0, Name : 0 ,  Vegetables:0})
                        }  
                        else
                        {
                          console.log(message)
                          res.send(message);
                        }
                      }
                });
           

      })
      return router;
      
    }