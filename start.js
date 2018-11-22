var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login',function(req,res){
  var user_name=req.body.user;
  var password=req.body.password;
  console.log("User name = "+user_name+", password is "+password);
  res.end("yes");
});


app.get('/name', callName);
function callName(req, res) {
    var spawn = require("child_process").spawn;
    // E.g.: http://localhost:3000/name?firstname=Mike&lastname=Will
	var process = spawn('python',["./hello.py",
                            req.query.firstname,
                            req.query.lastname] );

    process.stdout.on('data', function(data) {
        res.send(data.toString());
    } )
}

var port = process.env.PORT || 3000;
server.listen(port,'fishing-phishing.herokuapp.com');
server.on('listening',function(){
        console.log('server start ! on port 3000');
});

