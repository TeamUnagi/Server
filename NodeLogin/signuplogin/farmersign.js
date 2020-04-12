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
module.exports=() =>{
router.post("/",(req,res)=> {
message={message:'message'};
userinfo=req.body;
sqlRequest.query(parse("SELECT * FROM dbo.Farmer WHERE Email = '%s' ", userinfo.Email), (err, rows) => {
    if(err){console.log(err);}
     if(rows.rowsAffected==1){
         message.message='unsuccessfully'
         res.send(message)
     }
     else{ 
        sqlRequest.query(parse("SELECT * FROM dbo.Farmer WHERE Username = '%s' ", userinfo.Username),(err, row)=>{
            if(err){console.log(err);}
            if(row.rowsAffected==1){
                message.message='user'
                res.send(message)
            }
            else{
                message.message='success'
                sqlRequest.query(parse("INSERT INTO dbo.Farmer (Username,Password,Email,Location,Fullname) values ('%s', '%s','%s','%s','%s')",
                userinfo.Username,userinfo.Password,userinfo.Email,userinfo.Location,userinfo.Fullname),(err)=>{
                    if(err)
                     {console.log(err)}
                    else{
                        message.message='success'
                        res.send(message)
                    }
                })
            }
        })
     }
  

})})
return router;
}
