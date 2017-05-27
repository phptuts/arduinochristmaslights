var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser());

var separator = "|";

var leds = {
  "reds":[],
  "greens":[],
  "blues":[],  
  "delayTimes": [],
  "lightPositions": [],
  "requestTime": 1000
};

for (var i = 0; i < 60; i += 1) {
   leds.blues.push(255);
   leds.reds.push(0);
   leds.greens.push(0);
   leds.delayTimes.push(10);
   leds.lightPositions.push(i)
}    

for (var i = 60; i > 0; i -= 1) {
   leds.blues.push(255);
   leds.reds.push(0);
   leds.greens.push(0);
   leds.delayTimes.push(10);
   leds.lightPositions.push(i)
}    
    
    
app.get('/leds', function (req, res) {
  console.log(leds);
  res.send(separator + JSON.stringify(leds));
});

app.get('/leds-web', function(req, res) {
    
});

app.post('/leds-pattern', function(req, res) {
    console.log(req, 'post body');
    leds = req.body;
    res.send('OK');
});


app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});


function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

app.listen(8080, function () {
  console.log('Example app listening on port 80!')
});