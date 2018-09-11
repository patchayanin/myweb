var mysql = require('mysql');
var express = require('express');
var cors = require('cors')
var app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({type:'*/*'}))
app.use(cors())

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "mywebdatabase"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
//   var sql = "INSERT INTO user (iduser,username, password) VALUES ('1', 'punch','1234')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
});

// api here 
app.post('/Signup', function(req, res) {
    var post = {
      username: req.body.username,
      password: req.body.password,
      birthdate: req.body.birthdate
    };

    var sql = "INSERT INTO user (username,password,birthdate) VALUES (\'"+post.username+"\',\'"+post.password+"\',\'"+post.birthdate+"\')";
    con.query(sql, function (err, result) {
        console.log(err)
        // if (err) throw err;
        console.log("1 record inserted");
        // send response here
      res.json({msg:'success'});
    });
    // con.end();
  });

app.post('/Login', function(req, res) {
    var post = {
      username: req.body.username,
      password: req.body.password
    };

    var sql = "SELECT * from user where username=\'"+post.username+"\' and"+" password=\'"+post.password+"\'";
    con.query(sql, function(err, rows, fields) {
      console.log(rows)
      console.log(err)
      if (!err) {
            res.send(JSON.stringify(rows));
            console.log(JSON.stringify(rows))
      } else {
        console.log('Error while performing Query.');
      }
    });
    // con.end();
  });

  app.listen(3000,()=>{
    console.log('ready on http://localhost:3000')
})