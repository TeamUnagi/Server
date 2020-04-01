const express=require("express");
const app=express();
var mysql = require('mssql');
var dbconfig = require('./config/database');
const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
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
app.post("/userLogin",(req,res)=> {
    loginInfo=req.body;
    sqlRequest.query(parse("SELECT * FROM dbo.Farmer WHERE Username = '%s' AND Password = '%s'", loginInfo.Username,loginInfo.Password), (err,rows) => {
        if(err){console.log(err);}   
        if(rows.rowsAffected==1){
               console.log('Login successful');
               res.send({message:'success'})
           }else{
            sqlRequest.query(parse("SELECT * FROM dbo.Exporter WHERE Username = '%s' AND Password = '%s'", loginInfo.Username,loginInfo.Password), (err,rows) => {
                if(err){console.log(err);}
                if(rows.rowsAffected==1){
                    console.log('Login successful');
                    res.send({message:'success'})
                }
                else{
                    console.log('Login unsuccessfully');
                    res.send({message:'unsuccessful'})
                }
            });
           }

        });
    })
app.listen(PORT,()=>console.log("Server is ready at "+PORT));