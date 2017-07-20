const url           = require("url");
const querystring   = require('querystring');

//Express and set up router
var express         = require('express');
var router          = express.Router();

//Configs and Modules
var config      = require("./../../config/config");


var http = require("http");


router.get("/data/2.5/weather", function(req, res){
  //http://api.openweathermap.org/data/2.5/weather?lat=-31.9674&lon=115.8621&appid=e2b16ccfd1a9e3611dcdd1b1ee91e08f
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
