process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express     = require('./config/express');

var app         = express();
var config      = require('./config/config');
var port = config.port;
app.listen(port);
module.exports = app;
console.log('server running at http://localhost:' + port);
