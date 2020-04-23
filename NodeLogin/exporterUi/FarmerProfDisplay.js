const express=require("express");
const router=express.Router();
var mysql = require('mssql');
var dbconfig = require('C:\\Users\\User\\Desktop\\nodeunag\\ServerSideUnagi\\NodeLogin\\Database\\database.js'); 
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
router.post("/",(req,res)=>{
    farmerId=req.body.farmerId;
    console.log(farmerId)
    sqlRequest.query(parse("SELECT * FROM dbo.Farmer WHERE id = %s", farmerId), (err, rows) => {
        if(err){console.log(err);}
        else{
            sqlRequest.query(parse("SELECT * FROM dbo.Contract WHERE FarmId = %s", farmerId), (err, row) => {
                if(err){console.log(err);}
                else{
                   // message={Name:rows.Username,Email:rows.Email,Number:rows.Number,Description:rows.Description};
                    exportName=[];
                    var message2=[];
                    var i=0;
                    for(i=0;i<row.rowsAffected[0];i++){
                    sqlRequest.query(parse("SELECT Fullname FROM dbo.Exporter WHERE id = %s", row.recordset[i].ExId), (err, column) => { 
                        if(err){console.log(err);}
                        else{
                        exportName.push(column.recordset[0].Fullname)
                        if(exportName.length==(row.rowsAffected[0])){
                            for(j=0;j<row.rowsAffected[0];j++){
                              message2.push({Name:exportName[j],Vegetable:row.recordset[j].Vegetable,Weight:row.recordset[j].Weight})
                            }
                             message={row1:rows.recordset,row2:message2}
                             res.send(message)
                         }
                     }
                    })
                   }
            }
            })
        }
    })
})
return router;
}