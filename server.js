var express = require('express');
var port = process.env.PORT || 3000;
var app = express(),
path = require('path'),
publicDir = path.join(__dirname,'public');

var logger = require('morgan');


app.use(logger({
    format: 'dev',
    stream: fs.createWriteStream('app.log', {'flags': 'w'})
  }));

app.use(express.static(publicDir))

app.listen(port);
module.exports = app;
