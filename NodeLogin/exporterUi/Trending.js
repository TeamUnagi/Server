const express=require("express");
const router=express.Router();
var mysql = require('mssql');
var dbconfig = require('C:\\Users\\User\\Desktop\\NodeUnagi\\gitrepo\\ServerSideUnagi\\NodeLogin\\Database\\database.js'); 
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
    sqlRequest.query(parse("SELECT * FROM dbo.VegetableImports WHERE ImportYear=2020 ORDER BY Vegetable"), (err,rows) => {
        if(err){console.log(err);}   
        else{
            array1=rows.recordset;
            array3=rows.recordset
            sqlRequest.query(parse("SELECT * FROM dbo.VegetableImports WHERE ImportYear=2021 ORDER BY Vegetable"), (err,row) => {
                if(err){console.log(err);}
                else
                {
                    array2=row.recordset;
                    array4=row.recordset;
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
                        Torder.push({Vegetable:array2[Lposition].Vegetable,Import:array2[Lposition].Imports,Percentage:largest})
                        array1.splice(Lposition,1);
                        array2.splice(Lposition,1);
                    }
                    res.send(Torder)
                }
            })
        }
        });
    })
    return router;
}