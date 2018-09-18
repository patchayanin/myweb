var mysql = require('mysql');
var express = require('express');
var cors = require('cors');
var app = express();
const bodyParser = require('body-parser')
var bcrypt = require('bcrypt');


app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({type:'*/*'}))
app.set('port',process.env.PORT||3001)

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "mywebdatabase"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.post('/Signup', function(req, res) {
    var post = {
      username: req.body.username,
      password: req.body.password,
      birthdate: req.body.birthdate
    };

    var sql = "SELECT * from user where username=\'"+post.username+"\'";
    con.query(sql, function(err, rows, fields) {
      console.log(rows)
      if (!err) {
        if (JSON.stringify(rows).length == 2){
          bcrypt.hash(post.password, 10, function(err, hash) {
            if (err) { throw (err); }
            console.log(hash)
            var sql = "INSERT INTO user (username,password,birthdate) VALUES (\'"+post.username+"\',\'"+hash+"\',\'"+post.birthdate+"\')";
            con.query(sql, function (err, result) {
              if (err) throw err;
              console.log("1 record inserted");
              res.json({msg:'success'});
            });
          });
        }
        else{
          console.log("This username have already used! Please change")
          res.json({msg:'fail'});
        }   
      } else {
        console.log(err+'Error while performing Query.');
      }
      });
    // con.end();
  });

app.post('/Login', function(req, res) {
    var post = {
      username: req.body.username,
      password: req.body.password
    };

    if (post.username != null){
      var sql = "SELECT * from user where username=\'"+post.username+"\'";
      con.query(sql, function(err, rows, fields) {
      console.log(JSON.stringify(rows))
      if (!err) {
        if (JSON.stringify(rows).length == 2){
           console.log("username doesn't match any account")
           res.json({msg:'fail'});
        }
        else{
            log = JSON.stringify(rows)
            user = JSON.parse(log)[0]
            console.log(user.password)
            console.log(post.password)
            bcrypt.compare(post.password, user.password, function(err, result) {
              if (err) { throw (err); }
              console.log(result);
              if(result){
                console.log("Login successfull")
                res.json({msg:'success'});
              }else {
                console.log("password doesn't match any account")
                res.json({msg:'fail'});
              }
            });
        } 
      } else {
        console.log(err+'Error while performing Query.');
      }
      });
    }
    else{
      console.log('Error username = null');
    }
  });

  app.listen(3001,()=>{
    console.log('ready on http://localhost:3001')
})