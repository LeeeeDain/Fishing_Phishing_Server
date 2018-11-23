var express = require('express');

var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3001);



var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());



var voice_text = '';



app.post('/text', function(req,res){

  var initialize = req.body.initialize;

  if(initialize == 1)

    voice_text = '';

  voice_text += req.body.text;



  // var spawn = require("child_process").spawn;

  // var process = spawn('python',["./Deep_Learning/CNNTextClassification/hello.py",

  // ​                            voice_text] );

  // ​process.stdout.on('data', function(data) {

  //   res.send(data.toString());

  // })

  var PythonShell = require('python-shell');

    

  var options = {

    mode: 'text',

    pythonPath: './Deep_Learning/CNNTextClassification/',

    pythonOptions: ['-u'],

    scriptPath: '',

    args: [voice_text]

  };

  

  PythonShell.run('eval.py', options, function (err, results) {

    if (err) 

      throw err;

    // Results is an array consisting of messages collected during execution

    console.log('results: %j', results);

  });

  

  

});



http.createServer(app).listen(app.get('port'), function(){

	console.log('start server on port' + app.get('port'));

});


