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
router.get("/",(req,res)=> {
    sqlRequest.query(parse("SELECT * FROM dbo.VegetableImports WHERE ImportYear=2020 OR ImportYear=2021 ORDER BY Vegetable"), (err,rows) => {
        if(err){console.log(err);}   
        else{
            array1=[];
            array2=[];
            for(var k=0;k<rows.rowsAffected[0];k++)
            {
                if(rows.recordset[k].ImportYear==2020){
                    array1.push(rows.recordset[k]);}
                    else{
                        array2.push(rows.recordset[k]);
                    }
            }
                    Torder=[];
                    while (array2.length>0)
                    {
                        largest=-1000;
                        for(var j=0;j<array2.length;j++)
                        {
                            percentage=((array2[j].Imports-array1[j].Imports))/array1[j].Imports*100
                            if(percentage>largest)
                            {
                                largest=percentage;
                                Lposition=j;
                            }
                        }
                        largest=Math.round(largest*100)/100
                        Torder.push({Vegetable:array2[Lposition].Vegetable,Import:array2[Lposition].Imports,Percentage:largest})
                        array1.splice(Lposition,1);
                        array2.splice(Lposition,1);
                    }
                    res.send(Torder)  
        }
        });
    })
    return router;
}