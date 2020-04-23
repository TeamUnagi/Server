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
    var location=req.body.Location;
    Vegetables = [];
    sqlRequest.query(parse("SELECT * FROM dbo.OptimimDistrictsForVegetables WHERE District='%s'",location) , (err, row) => {
        if(err){console.log(err);}
        else{
            for(i = 0; i < row.rowsAffected[0]; i++){
                Vegetables.push({Vegetable:row.recordset[i].Vegetables})
            }
            res.send(Vegetables)
        }
    
    })


 })
 return router
}
