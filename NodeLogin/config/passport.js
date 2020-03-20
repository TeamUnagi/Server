var LocalStrategy = require("passport-local").Strategy;

var mysql = require('mssql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
try{
mysql.connect(dbconfig.connection, (err) =>{
  if (err) console.log(err)
  let sqlRequest=new mysql.Request();
});}catch(err){
  console.log("In Catch Block")
  console.log(err);
}
module.export = (passport) => {
 passport.serializeUser((user, done)=>done(null, user.id));

 passport.deserializeUser((id,done) =>{
  sqlRequest.query("SELECT * FROM users WHERE id = ? ", [id],
   (err, rows)=>done(err, rows[0]));
 });

 passport.use(
  'local-signup',
  new LocalStrategy({
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },
  (req, username, password, done) => {
   sqlRequest.query("SELECT * FROM users WHERE username = ? ", 
   [username], (err, rows) => {
    if(err)
     return done(err);
    if(rows.length){
     return done(null, false, req.flash('signupMessage', 'That is already taken'));
    }else{
     var newUserMysql = {
      username: username,
      password: bcrypt.hashSync(password, null, null)
     };

     var insertQuery = "INSERT INTO users (username, password) values (?, ?)";

     sqlRequest.query(insertQuery, [newUserMysql.username, newUserMysql.password],
      (err, rows) => {
       newUserMysql.id = rows.insertId;
       return done(null, newUserMysql);
      });
    }
   });
  })
 );

 passport.use(
  'local-login',
  new LocalStrategy({
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },
  (req, username, password, done)=>{
   sqlRequest.query("SELECT * FROM users WHERE username = ? ", [username],
   (err, rows)=>{
    if(err)
     return done(err);
    if(!rows.length){
     return done(null, false, req.flash('loginMessage', 'No User Found'));
    }
    if(!bcrypt.compareSync(password, rows[0].password))
     return done(null, false, req.flash('loginMessage', 'Wrong Password'));

    return done(null, rows[0]);
   });
  })
 );
};