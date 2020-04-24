const express=require("express");
const router=express.Router();
var mysql = require('mssql');
var dbconfig = require('C:\\Users\\Yeshan\\Documents\\unagiServergit\\ServerSideUnagi\\NodeLogin\\Database\\database.js'); 
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
  function getOccurrence(array, value) {
    return array.filter((v) => (v === value)).length;
}
  module.exports = () => {
    router.post("/", (req,res) => {
        Locations = [];
        Farmers = [];
        vegetable = req.body.Vegetable;

        sqlRequest.query(parse("SELECT od.District AS Districts FROM dbo.OptimimDistrictsForVegetables AS od  JOIN dbo.Farmer AS fm ON od.District = fm.Location WHERE od.Vegetables = '%s'",vegetable) , (err,row) => {
            if(err){console.log(err);}
            else{
                for(i = 0; i < row.rowsAffected[0]; i++){
                    Location=row.recordset[i].Districts
                    Locations.push(Location);
                      
                }
                NewLocation=[];
                farmerCount=[];
                for(x = 0; x < Locations.length; x ++){
                    if(!NewLocation.includes(Locations[x]))
                    {
                        NewLocation.push(Locations[x])
                    }
                 } 
                 for(y=0;y<NewLocation.length;y++)
                 {
                     n=getOccurrence(Locations,NewLocation[y])
                     farmerCount.push(n)
                 }
                //console.log(Locations)
                //console.log(Farmers)
               // console.log({District:NewLocation,Farmer:Farmers})
                res.send({District:NewLocation,Farmer:farmerCount})
                
            }

        })
    })
    return router;
  }