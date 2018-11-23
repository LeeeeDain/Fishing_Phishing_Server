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


  res.send("voice text : " + voice_text.toString() + "\n");

  var spawn = require("child_process").spawn;

  res.send("test1");

  var process = spawn('python',["./Deep_Learning/CNNTextClassification/eval.py",
                            voice_text] );

  res.send("test2");

  process.stdout.on('data', function(data) {
      res.send(data.toString() + "\n");
    })
  res.send("test3");

  res.end("python end!");
  res.send("test4");
});



http.createServer(app).listen(app.get('port'), function(){
	console.log('start server on port' + app.get('port'));

});


