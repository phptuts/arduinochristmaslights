var express = require('express')
var app = express()


app.get('/led-binary-rrb', function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/octet-stream', 'Content-Length': '180'});
    for (var i = 0; i < 20; i += 1) {
      res.write(new Buffer([0xFF, 0x00, 0x00]), 'binary');
      res.write(new Buffer([0xFF, 0x00, 0x00]), 'binary');
      res.write(new Buffer([0x00, 0x00, 0xFF]), 'binary');
    }
    res.end();
});

app.get('/led-binary-fade', function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/octet-stream', 'Content-Length': '180'});
    var red = 0x01;
    for (var i = 0; i < 60; i += 1) {
      res.write(new Buffer([red, 0x00, 0x00]), 'binary');
      red += 0x01;
    }
    res.end();
});

app.get('/led-binary', function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/octet-stream', 'Content-Length': '180'});
    var red = 0x01;
    var blue = 0x3C;
    for (var i = 0; i < 60; i += 1) {
      res.write(new Buffer([red, 0x00, blue]), 'binary');
      red += 0x01;
      blue -= 0x01;
    }
    res.end();
});