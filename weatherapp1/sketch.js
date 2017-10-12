// Sketch for using the darksky API
// https://darksky.net/dev/docs
// This sketch requires you to start a local server or run it on a server
// See more about how to do that here:
// https://github.com/processing/p5.js/wiki/Local-server

var queryResult;
var img;

 // function preload(){
 //   img = loadImage("assets/waterdrop.png");
 // }

function setup() {
  createCanvas(320, 568);
   //image(img, 0, 0);
  background(252, 234, 227);
query();
}

// Run the API call
function query() {

  // URL for querying
  var url= 'https://api.darksky.net/forecast/687d436565118eaf81a39a9ac4b34601/42.361936, -71.097309';

  // Query the URL, set a callback
  // 'jsonp' is needed for security
  loadJSON(url, gotData, 'jsonp');
}

// Request is completed
function gotData(data) {
  // console.log(data);
  queryResult = data;

  // only look at current results:
  var currentWeather = queryResult.currently;
  var day = queryResult.daily.data[0];
  
  // a few variables for text formatting
  var xPos = 90;
  var xGap = 60 
  var yPos = 40;
  var yGap = 60; 
  var textSizeLarge = 50;
  var textSizeSmall = 14;

  // List relevant items of information
  fill(0);
  textFont('Abril Fatface');
  // textStyle(BOLD);


  // The location is not live data, just entered manually
  textSize(textSizeSmall);
  text("the weather in",110, yPos);
  yPos+=textSizeLarge;
  textSize(textSizeLarge);
  text("Cambridge",30, yPos);
  yPos+=yGap;

  textSize(textSizeLarge);
  text(currentWeather.temperature + "º", 90, 250);
  yPos+=yGap;

  textSize(textSizeSmall);
  text(day.temperatureMin + "º",40, 250);
  yPos+=yGap;
  textSize(textSizeSmall);
  text(day.temperatureMax + "º",220, 250);
  xPos+=xGap;
  yPos+=yGap;

  
  fill(0);
  ellipse(45,275,5,5);
  ellipse(240,275,5,5);
  line(45,275,240,275);
  var value = currentWeather.temperature;
  var m = map(value, 45, 240,day.temperatureMin, day.temperatureMax);
  ellipse(m + 45,275,10,10);
  triangle(125, 400, 150, 360 ,175,400);
  arc(150, 400, 50, 50, 0, PI);

  textSize(textSizeSmall);
  fill(252, 234, 227);
  text(currentWeather.precipProbability + "%",140, 405);
}



