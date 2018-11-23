var express = require('express');

var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3001);



var bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());



app.post('/login',function(req,res){

  var user_name=req.body.user;

  var password=req.body.password;

  console.log("User name = "+user_name+", password is "+password);

  res.end("yes");

});





app.get('/name', function(req, res) {

    var spawn = require("child_process").spawn;

    var process = spawn('python',["./hello.py",

                            req.query.firstname,

                            req.query.lastname] );



    process.stdout.on('data', function(data) {

      res.send(data.toString());

    })

});


http.createServer(app).listen(app.get('port'), function(){

	console.log('start server on port' + app.get('port'));

});


