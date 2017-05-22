var express = require('express')
var app = express()


app.get('/leds', function (req, res) {
  
  var leds = "";
  for (var i = 0; i < 60; i += 1) {
      leds += "|" + 0 + "|"
                  + getRandomArbitrary(49, 191) + "|" 
                  + getRandomArbitrary(49, 191);
  }

  res.send(leds);
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