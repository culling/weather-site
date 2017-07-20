var openWeatherMapApiKey = "66adcd6081cf0e0ae9db3069ec10a591";
var geoPositionCoords;
var displayType;

var backgroundImages = {
    "Thunderstorm":{
        backgroundImageUrl: "url(//upload.wikimedia.org/wikipedia/commons/2/22/Lightning_14.07.2009_20-42-33.JPG)",
        color:              "darkslategrey"        
    },
    "Drizzle": {
        backgroundImageUrl: "url(//upload.wikimedia.org/wikipedia/commons/8/8d/Here_comes_rain_again.jpg)",
        color:              "darkslategrey"
        },
    "Rain": {
        backgroundImageUrl: "url(//upload.wikimedia.org/wikipedia/commons/8/8d/Here_comes_rain_again.jpg)",
        color:              "darkslategrey"
        },
    "Snow":{
        backgroundImageUrl: "url(//upload.wikimedia.org/wikipedia/commons/7/70/Kuznetsk_Alatau_3.jpg)",
        color:              "darkslategrey"
    },
    "Atmosphere":{
        backgroundImageUrl: "url(//upload.wikimedia.org/wikipedia/commons/8/8d/Here_comes_rain_again.jpg)",
        color:              "darkslategrey"
    },
    "Clear":{
        backgroundImageUrl: "url(//upload.wikimedia.org/wikipedia/commons/6/6a/Summer_time.jpg)",
        color:              "darkslategrey"        
    },
    "Clouds": {
        backgroundImageUrl: "url(//upload.wikimedia.org/wikipedia/commons/7/7b/Rainclouds_over_Bagno_%C5%81awki%2C_Biebrza_National_Park%2C_Poland_%284664558412%29.jpg)",
        color:              "darkslategrey"
    },
    "Extreme":{
        backgroundImageUrl: "url(//upload.wikimedia.org/wikipedia/commons/9/98/F5_tornado_Elie_Manitoba_2007.jpg)",
        color:              "darkslategrey"
    },
    "Additional":{
        backgroundImageUrl: "url(//upload.wikimedia.org/wikipedia/commons/7/7b/Rainclouds_over_Bagno_%C5%81awki%2C_Biebrza_National_Park%2C_Poland_%284664558412%29.jpg)",
        color:              "darkslategrey"
    }
}

$(document).ready(function(){
  console.log("javascript loaded");
    showLoading();
    $.ajaxSetup({
        cache: false
    });
    //set Background 

  
  
    displayType = "C";

    getWeather();

});

function showLoading(){
    $(".weatherText").html('<div style="text-align : center;" ><div class="loader" style="display: inline-block;"></div></div>');
    $(".weatherLocation").html('');
}

function changeDisplayType(){
    displayType = $(".displayType").text()
    console.log(displayType );    
    if( (displayType == "F") || (displayType == "f") ){
        displayType = "C";
    }else{
        displayType = "F";
    }

    getWeather();
}

function convertTemp(temp, fromType, toType){
    var tempKelvin;
    var returnTemp;
    function convertTempFtoC (tempF){
        var tempC = (((tempF / (9 *5) )  -32));
        return tempC;
    };
    function convertTempCtoF(tempC){
          var tempF = ((tempC * (9 / 5))+32);
          return tempF;
    };
    
    function convertTempCtoK(tempC){
        var tempK = tempC + 272.15;
        return tempK;
    };

    function convertTempKtoC(tempK){
        var tempC = tempK - 272.15;
        return tempC;
    };
    function convertTempKtoF(tempK){
        var tempC = tempK - 272.15;
        var tempF = convertTempCtoF(tempC)
        return tempF;
    };



    if( (fromType == ("k" )) || (fromType == ( "K")) ) {
        tempKelvin = temp;
    } else if ( (fromType == ("c")) || (fromType == ("C")) ) {
        tempKelvin = convertTempCtoK(temp);
    }  else if ( (fromType == ("f")) || (fromType == ("F")) ){
        tempKelvin = convertTempCtoK( convertTempFtoC(temp) );
    }

    console.log("Kelvin Temp: " + tempKelvin);

    if( (toType == ("k")) || (toType == ("K")) ){
        returnTemp = tempKelvin;
    }else if ( (toType == ("c")) || (toType == ("C")) ){
        returnTemp = convertTempKtoC(tempKelvin);
    }  else if ( (toType == ("f")) || (toType == ("F")) ){
        returnTemp = convertTempKtoF(tempKelvin);
    }

    console.log("Converted Temp: " + returnTemp );
    return Math.floor(returnTemp);
}

function getLocation(done) { 
    //if(navigator.geolocation){
        //navigator.geolocation.getCurrentPosition(function (geoPositionObject){
 //           geoPositionCoords = geoPositionObject.coords ;
    console.log('getLocation called');
    var locationByIpAddress;
    var locationByIpAddressURL = "http://freegeoip.net/json/" ;

    jQuery.getJSON(locationByIpAddressURL,
                function (returnValue){
        console.log(returnValue);
                
        locationByIpAddress = returnValue;
        console.log(locationByIpAddress);

    var lat =  locationByIpAddress.latitude ;
    var lon =  locationByIpAddress.longitude ;
    
    done(lat, lon);
    });
}

function getWeather(){
    getLocation(function(lat, lon){
        var weatherURL = "/data/2.5/weather?" +
                "lat="  + lat +
                "&lon=" + lon +
                "&appid=" + openWeatherMapApiKey ;

        console.log(weatherURL);
          
        jQuery.getJSON(weatherURL,
        function (returnValue){
            console.log(returnValue);

            //Weather Information and location
                var displayTemp = convertTemp(returnValue.main.temp, "K", displayType);
                console.log(displayTemp);
                jQuery(".weatherLocation").html(returnValue.name);
                jQuery(".weatherText").html(displayTemp +
                ' <a onclick="changeDisplayType()"><button class="btn btn-default displayType">'  +
                     displayType +
                 "</button></a>");

            //BackgroundImage and Weather Styling
                jQuery('body').css({
                    "background-image": backgroundImages[returnValue.weather[0].main].backgroundImageUrl ,
                    "background-size": "cover",
                });

                jQuery('.weatherContainer').css({
                    //"background-color": "yellow"
                })

            });
        }) ;
        
          //});
    /*}*/
};

function getGeoPosition(){
    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function (geoPositionObject){
            geoPositionCoords = geoPositionObject.coords ;
        });
    }
};
