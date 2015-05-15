var express = require('express');
var app = express();
var port_number = process.env.PORT;
app.use('/', express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
var serve = app.listen((port_number || 3000), function() {
  var host = serve.address().address;
  var port = serve.address().port;
  console.log('Listening at http://%s:%s', host, port);
});
