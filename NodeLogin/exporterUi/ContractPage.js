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
contractinfo=req.body;
console.log(contractinfo.ExId,contractinfo.FarmerId,contractinfo.Weight,contractinfo.VegetableChosen,contractinfo.EndDate,contractinfo.Comment)
sqlRequest.query(parse("INSERT INTO dbo.Contract (ExId,FarmId,Weight,Vegetable,EndDate,Comment,Accepted,SendExporter,FarmerRead,ExporterRead) values ('%s', '%s','%s','%s','%s','%s','No','No','No','No')",
contractinfo.ExId,contractinfo.FarmerId,contractinfo.Weight,contractinfo.VegetableChosen,contractinfo.EndDate,contractinfo.Comment), (err, rows) => {
    if(err){console.log(err);}
    else
    {
        res.send('success');
    }
})})
return router;
}

