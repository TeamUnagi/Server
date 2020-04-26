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
    loginInfo=req.body;
    sqlRequest.query(parse("SELECT * FROM dbo.Farmer WHERE Username = '%s' AND Password = '%s'", loginInfo.Username,loginInfo.Password), (err,rows) => {
        if(err){console.log(err);}   
        if(rows.rowsAffected==1){

               message={message:'success',id:rows.recordset[0].id,name:rows.recordset[0].Fullname,category:'Farmer'}

                console.log(message)
               res.send(message)
           }else{
            sqlRequest.query(parse("SELECT * FROM dbo.Exporter WHERE Username = '%s' AND Password = '%s'", loginInfo.Username,loginInfo.Password), (err,row) => {

                if(err){console.log(err);}
                if(row.rowsAffected==1){

                    message={message:'success',id:row.recordset[0].id,name:row.recordset[0].Fullname,category:'Exporter'}

                    res.send(message)
                }
                else{
                    res.send({message:'unsuccessful'})
                }
            });
           }

        });
    })
    return router;
}
