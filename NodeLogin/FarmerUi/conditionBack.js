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
        Fid=req.body.FarmerId;
        Vegetable=req.body.Vegetable;
        var d = new Date,month = '' + (d.getMonth() + 1),year = d.getFullYear();
        if (month.length < 2) 
        month = '0' + month;
        var water="No"
        var Fday=[month,year].join('/');
        sqlRequest.query(parse("SELECT Location from dbo.Farmer WHERE id='%s'", Fid),(err, row)=>{
            if(err){console.log(err);}
            sqlRequest.query(parse("SELECT Temperature,Humidity FROM dbo.%s WHERE Date='%s'", row.recordset[0].Location,Fday),(err, rows)=>{
                sqlRequest.query(parse("SELECT *FROM dbo.optimumConditions WHERE Vegetables='%s'",Vegetable),(err, column)=>{
                    console.log(column.recordset[0].TemperatureF)
                    temp=(column.recordset[0].TemperatureF-32)*5/9;
                    if((rows.recordset[0].Temperature>=temp+5)&&(rows.recordset[0].Humidity<=column.recordset[0].HumidityPercent-15))
                    {
                        water="More"
                    }
                    else if((rows.recordset[0].Temperature>=temp+5)||(rows.recordset[0].Humidity<=column.recordset[0].HumidityPercent-15)){
                       water='Water' 
                    }
                    else{water='No'}
                    message={WaterReq:Math.round(column.recordset[0].waterReq * 10) / 10,phLevel:  Math.round(column.recordset[0].phLevel* 10) / 10,Temp: Math.round(temp* 10) / 10,Humidity:column.recordset[0].HumidityPercent,water:water,Date:Fday}
                    res.send(message)
                })
            })
        })
    })
    return router;
  }