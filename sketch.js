
var capture;
var mic;


function preload() {

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide();

  mic = new p5.AudioIn();
  mic.start();

}

function draw() {
  background(200,255,255);
  capture.loadPixels();

  var stepSize = 10;
  for(var x=0; x<capture.width; x+=stepSize){
    for(var y=0; y<capture.height; y+=stepSize){
    var i = x+ capture.width*y;
    var darkness = (255 - capture.pixels[i*4])/255;
    var radius = stepSize*darkness;
    noStroke();
    var col = color(255-x/capture.width*255,255-y/capture.height*255,y/capture.height*255);
    fill(col);
    ellipse(x+100,y+100,radius,radius);
    }
  }

  var vol = mic.getLevel();
  for(var k=0; k<windowWidth; k+=3){
    var col2 = color(165+vol*40*(k/40), 105-vol*50*(k/30), 189-vol*40);
    stroke(col2);
    strokeWeight(1.5);
    var hertz = map(mouseX, 0, width, 100, 340);
    var angle = map(k, 0, width, TWO_PI * hertz, 0);
    var sinValue = sin(angle) * 30 * (vol*50);
    line(k, 0, k, sinValue);
    fill(col2);
    ellipse(k, sinValue, 2);
  }

}
