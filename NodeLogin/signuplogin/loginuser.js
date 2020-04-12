const express=require("express");
const router=express.Router();
var mysql = require('mssql');
var dbconfig = require('C:\\Users\\User\\Desktop\\NodeUnagi\\gitrepo\\ServerSideUnagi\\NodeLogin\\Database\\database.js'); 
const PORT=4000;
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
               res.send({message:'success'})
           }else{
            sqlRequest.query(parse("SELECT * FROM dbo.Exporter WHERE Username = '%s' AND Password = '%s'", loginInfo.Username,loginInfo.Password), (err,rows) => {
                if(err){console.log(err);}
                if(rows.rowsAffected==1){
                    res.send({message:'success'})
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
