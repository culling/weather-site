//Settings
var config      = require("./config");


//Modules
var http        = require('http');
var express     = require("express");



//Express App
var app         = express();

module.exports  = function(){
    

    var bodyParser = require("body-parser");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));


    var index = require("./../app/routes/index.route.server");
    app.use("/", index);

    //static files
    app.use(express.static('./public'));

    return app;
}