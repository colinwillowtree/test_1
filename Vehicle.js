function Vehicle(x, y, r) {
  this.position = createVector(x, y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.mouse = createVector(mouseX, mouseY);


  this.maxSpeed = random(24, 28);
  this.maxForce = this.maxSpeed*0.1;

  this.r = r;
}

Vehicle.prototype.update = function(x, y, z) {
  this.position.add(this.velocity);
  this.velocity.add(this.acceleration);
  this.acceleration.mult(0);

  this.target = createVector(x, y, z);
}

Vehicle.prototype.show = function() {

  var vel = this.velocity.mag();
  var colR = map(this.velocity.x, 0, 10, 230, 51);
  var colG = map(this.velocity.y, 0, 10, 220, 151);
  var colB = map(vel, 0, 10, 250, 134);
  var radius = map(vel, 24, 0, 8, 5);

  push();
  noStroke();
  translate(this.position.x, this.position.y);
  //fill(255, 200);
  fill(colR*0.96-50, colG*0.98-50, colB*1.3-50, 251);
  ellipse(0, 0, 10, 10);
  pop();
}

Vehicle.prototype.flee = function(target) {
  var desired = p5.Vector.sub(target, this.position);
  var distance = desired.mag();
  if (distance < 50) {
    desired.setMag(this.maxSpeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);

    return steer;
  }
  return createVector(0, 0);
}

Vehicle.prototype.arrive = function(target) {
  var desired = p5.Vector.sub(target, this.position);
  var distance = desired.mag();
  var speed = this.maxSpeed;
  if (distance < 100) {
    speed = map(distance, 0, 100, 0, this.maxSpeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxForce);
  return steer;
}

Vehicle.prototype.behaviors = function() {
  var arrive = this.arrive(this.target);
  var mouse = createVector(mouseX, mouseY);
  var flee = this.flee(mouse);

  arrive.mult(.4);
  flee.mult(5);

  this.applyForce(arrive);
  this.applyForce(flee);
}

Vehicle.prototype.applyForce = function(force) {
  this.acceleration.add(force);
}

Vehicle.prototype.edges = function() {
  if (this.position.x <= -width/2 || this.position.x >= width/2) {
    this.velocity.x *= -1;
  }
  if (this.position.y <= -height/2 || this.position.y >= height/2) {
    this.velocity.y *= -1;
  }
}
