var express = require('express');

var http = require('http');

var app = express();



var bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());



app.post('/login',function(req,res){

  var user_name=req.body.user;

  var password=req.body.password;



  console.log("User name = "+user_name+", password is "+password);

  res.end("yes");



  var PythonShell = require('python-shell');

  var options = {

    mode: 'text',

    pythonPath: '',

    pythonOptions: ['-u'],

    scriptPath: '',

    args: ['dain', 'ain']

  };

  

  PythonShell.run('hello.py', options, function (err, results) {

    if (err) throw err;

    console.log('results: %j', results);

  });

  

});









app.set( 'port', process.env.PORT || 3001 );

http.createServer( app ).listen( app.get( 'port' ), function (){

  console.log( 'Express server listening on port ' + app.get( 'port' ));

});


