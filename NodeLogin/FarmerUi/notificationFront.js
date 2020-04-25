const express=require("express");
var mysql = require('mssql');
var dbconfig = require('C:\\Users\\User\\Desktop\\node\\ServerSideUnagi\\NodeLogin\\Database\\database.js'); 
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
        name=[];
        sqlRequest.query(parse("SELECT C.Contractid,E.Fullname FROM dbo.Contract as C JOIN dbo.Exporter as E ON C.ExId= E.id WHERE C.FarmId='%s' AND C.FarmerRead='No' ", FarmerId),(err, row)=>{
            if(err){console.log(err);}
            for(var i=0;i<row.rowsAffected[0];i++)
            {
                name.push({Id:row.recordset[i].Contractid,Name:row.recordset[i].Fullname})
            }
            res.send(name);
        })
    })
    return router;
}