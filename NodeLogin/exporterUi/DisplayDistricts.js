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

  module.exports = () => {
    router.post("/", (req,res) => {
        Locations = [];
        Farmers = [];
        farmerCount = 0;
        vegetable = req.body.Vegetable;

        sqlRequest.query(parse("SELECT od.District AS Districts FROM dbo.OptimimDistrictsForVegetables AS od  JOIN dbo.Farmer AS fm ON od.District = fm.Location WHERE od.Vegetables = '%s'",vegetable) , (err,row) => {
            if(err){console.log(err);}
            else{
                for(i = 0; i < row.rowsAffected[0]; i++){
                    Location=row.recordset[i].Districts
                    Locations.push(Location);
                      
                }
                for(x = 0; x < Locations.length; x ++){
                    for(i = 0; i < Locations.length; i ++){ 
                     if(Locations[x] == Locations[i])  {
                        farmerCount = farmerCount + 1
                        Locations.splice((i),1);
                    }
                }
                Farmers.push(farmerCount+1)
                farmerCount = 0;

            } 
                //console.log(Locations)
                //console.log(Farmers)
                res.send({District:Locations,Farmer:Farmers})
                
            }

        })
    })
    return router;
  }