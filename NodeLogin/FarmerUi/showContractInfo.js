const express=require("express");
const router=express.Router();
var mysql = require('mssql');
var dbconfig = require('C:\\Users\\User\\Desktop\\node\\ServerSideUnagi\\NodeLogin\\Database\\database.js'); 

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
    router.post("/", (req,res) => {
        Message = [];
        contractId = req.body.ContractId;
        sqlRequest.query(parse("SELECT ex.Fullname AS ExporterName, cn.Vegetable AS ExporterVegetables, cn.Contractid AS ContractId, cn.Weight AS Weight, cn.EndDate AS EndDate, cn.Comment AS Comment FROM dbo.Exporter AS ex JOIN dbo.Contract AS cn ON ex.id = cn.ExId WHERE cn.Contractid = '%s' ",contractId) , (err,row) => {
            if(err){console.log(err);}
            else{
                for(c = 0; c < row.rowsAffected[0]; c++){  
                    Message.push({name:row.recordset[c].ExporterName, vegetable:row.recordset[c].ExporterVegetables ,weight:row.recordset[c].Weight , endDate:row.recordset[c].EndDate , comment:row.recordset[c].Comment});               
                   } 
                   res.send(Message);

             }
           
        })
    })
    return router;
  }