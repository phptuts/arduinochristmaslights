var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser());

var separator = "|";

var numberOfLeds = 60;

var leds = {
  "reds":[],
  "greens":[],
  "blues":[],  
  "delayTimes": [],
  "lightPositions": [],
  "requestTime": 90 * 1000
};

leds = randomFunk();



    
app.get('/leds', function (req, res) {
  res.send(separator + JSON.stringify(leds));
});


app.post('/leds-pattern', function(req, res) {
    console.log(req, 'post body');
    leds = req.body;
    res.send('OK');
});

app.get('/leds-default/:pattern/:ledsNumber', function(req, res) {
   var pattern = req.params['pattern'];
  console.log(pattern);
    if(pattern == "random_funk") {
       leds = randomFunk();
    } 
    else if (pattern == 'christmas_light') {
      leds = christmasBackForthPattern();
    }
    else {
      leds = christmasSnakePattern();
    }
    
    res.send(separator + JSON.stringify(leds));
});

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});


function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomFunk() {
  
  var lights = {
      "reds":[],
      "greens":[],
      "blues":[],  
      "delayTimes": [],
      "lightPositions": [],
      "requestTime": 8 * 1000
    };
    
  for (var i = 0; i < numberOfLeds - 1; i += 1) {
    lights.blues.push(getRandomArbitrary(40, 140));
    lights.reds.push(i % 2 == 0 ? 255 : 0);
    lights.greens.push(i % 3 == 0 ? 255 : 0);
    lights.delayTimes.push(50);
    lights.lightPositions.push(i);
  }    

  for (var i = numberOfLeds - 1; i > 0; i -= 1) {
    lights.blues.push(i % 3 == 0 ? 255 : 0);
    lights.reds.push(i % 2 == 0 ? 255 : 0);
    lights.greens.push(getRandomArbitrary(10, 90));
    lights.delayTimes.push(50);
    lights.lightPositions.push(i);
  } 
  
  return lights;
}

function christmasSnakePattern() {
  
  var lights = {
      "reds":[],
      "greens":[],
      "blues":[],  
      "delayTimes": [],
      "lightPositions": [],
      "requestTime": 8 * 1000
    };
  
  for (var i = numberOfLeds - 1; i >= 0; i -= 1) {
    lights.blues.push(0);
    lights.reds.push(i % 2 == 0 ? 255 : 0);
    lights.greens.push(i % 2 == 1 ? 255 : 0);
    lights.delayTimes.push(50);
    lights.lightPositions.push(i)
  } 
  
  for (var i = 0; i <= numberOfLeds - 1; i += 1) {
    lights.blues.push(0);
    lights.greens.push(i % 2 == 0 ? 255 : 0);
    lights.reds.push(i % 2 == 1 ? 255 : 0);
    lights.delayTimes.push(50);
    lights.lightPositions.push(i)
  }
  
  return lights;
}

function christmasBackForthPattern() {
  
  var lights = {
      "reds":[],
      "greens":[],
      "blues":[],  
      "delayTimes": [],
      "lightPositions": [],
      "requestTime": 8 * 1000
    };
  
  for (var i = numberOfLeds -1; i >= 0; i -= 1) {
    lights.blues.push(0);
    lights.reds.push(i % 2 == 0 ? 255 : 0);
    lights.greens.push(i % 2 == 1 ? 255 : 0);
    lights.delayTimes.push(0);
    lights.lightPositions.push(i)
  } 
  
    lights.blues.push(0);
    lights.reds.push(255);
    lights.greens.push(0);
    lights.delayTimes.push(500);
    lights.lightPositions.push(0)

  
  for (var i = 0; i <= numberOfLeds -1; i += 1) {
    lights.blues.push(0);
    lights.greens.push(i % 2 == 0 ? 255 : 0);
    lights.reds.push(i % 2 == 1 ? 255 : 0);
    lights.delayTimes.push(0);
    lights.lightPositions.push(i)
  }
  
    lights.blues.push(0);
    lights.reds.push(255);
    lights.greens.push(0);
    lights.delayTimes.push(500);
    lights.lightPositions.push(59)

  
  return lights;
}

app.listen(8080, function () {
  console.log('Example app listening on port 80!');
});