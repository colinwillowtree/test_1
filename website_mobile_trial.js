let vehicles = [];

function preload() {
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadVehicles();
  rectMode(CENTER);
}
function loadVehicles() {
  for (var i=0; i<500; i++) {
    var v = new Vehicle(random(width), random(height), 7);
    vehicles.push(v);
  }
}


function draw() {
  windowResized();
  //push();
  //fill(51, 255);
  //rect(width/2, height/2, width, height);
  //pop();

  for (var i=0; i<vehicles.length; i++) {
    var v = vehicles[i];
    v.update(random(width), random(height));
    v.show();
    v.behaviors();
  }
  textSize(60);
 fill(51, 100);
  text(vehicles.length, width/2, height*0.86);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseDragged() {
  var v = new Vehicle(mouseX, mouseY, 7);
  vehicles.push(v);
}
