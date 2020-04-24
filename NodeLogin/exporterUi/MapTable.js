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
router.post("/",(req,res)=> {
    location=req.body.Location
    var message=[];
    sqlRequest.query(parse("SELECT * FROM dbo.Farmer WHERE Location='%s' ",location), (err,rows) => {
        if(err){console.log(err);}   
        else{
            for(i=0;i<rows.rowsAffected[0];i++)
            {
                message.push({Name:rows.recordset[i].Fullname,ID:rows.recordset[i].id,Key:i+1})
            }
            res.send(message)
        }
        });
    })
    return router;
}