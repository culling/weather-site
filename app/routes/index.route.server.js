const url           = require("url");
const querystring   = require('querystring');

//Express and set up router
var express         = require('express');
var router          = express.Router();

//Configs and Modules
var config      = require("./../../config/config");


var http = require("http");


router.get("/data/2.5/weather", function(req, res){
  var reqQuery    = querystring.parse(url.parse(req.url).query);
  console.log(reqQuery);
  console.log(req.url);

  var openWeatherMapHost= "api.openweathermap.org"

  http.get({hostname: openWeatherMapHost, path: req.url }, function(response){

    var responseBody="";
    response.on("data", function(data){
      responseBody += data;
    });
    response.on("end", function(){
      //console.log(responseBody[1]);


      res.write( responseBody );
      res.end();
    });
  })


});

module.exports = router;
