var express = require('express');

var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3001);



var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());



var voice_text = '';



app.post('/', function(req,res){

  var initialize = req.body.initialize;

  if(initialize == 1)

  voice_text = '';

  voice_text += req.body.text;


  var spawn = require("child_process").spawn;

  var process = spawn('python',["./hello.py",
                            voice_text,initialize ] );


  process.stdout.on('data', function(data) {
      res.send(data.toString() + "\n");
    })
  res.send("test3");

  res.send("test4");
});



http.createServer(app).listen(app.get('port'), function(){
	console.log('start server on port' + app.get('port'));

});


