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
        var userName = req.body.Username;
        var description = req.body.Description;
        var  Number = req.body.Number;
        sqlRequest.query(parse("UPDATE dbo.Farmer SET Description = '%s', Number = '%s' WHERE Username='%s'",description,Number,userName) , (err) => {
            if(err){console.log(err);}
            else{
                res.send('Done');
            }
        })

    
     })
     return router;
  }