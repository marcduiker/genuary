// Genuary, Prompt 1: Kinetics
// 
// Marc Duiker, Jan 2023
// Created using p5js

const maxCircles = 5;
const maxAngle = 0;
const minAngle = 0;
const maxAngleIncrement = 0.1;
const minAngleIncrement = 0.05;
const maxRadius = 250;
const minRadius = 50;
let circles = [];

function setup() {
  createCanvas(600, 600);
  frameRate(30);
  let direction = 1;
  for (let c = 0; c < maxCircles; c++) {
    let radius = map(c, 0, maxCircles, minRadius, maxRadius);
    let angle = direction * map(c, 0, maxCircles, minAngle, maxAngle);
    let angleDelta = direction * map(c, 0, maxCircles, minAngleIncrement, maxAngleIncrement);
    let circle = new Circle(radius, angle, angleDelta);
    circles.push(circle);
    direction *= -1;
  }
}

function draw() {
  background(10);
  translate(300, 300);
  
  circles.forEach(circle => {
    circle.draw();
    circle.update();
  });

  let circle1;
  let circle2;
  for (let i = 0; i < circles.length; i++) {
    circle1 = circles[i];
    if (i < circles.length - 1) {
      circle2 = circles[i+1];
      stroke(230);
      line(circle1.x, circle1.y, circle2.x, circle2.y);
    }
  }
  
}

class Circle {
  constructor(radius, angle, angleDelta) {
    this.radius = radius;
    this.angle = angle;
    this.angleDelta = angleDelta;
    this.x;
    this.y;
  }

  update() {
    this.angle += this.angleDelta;
  }

  draw() {
    this.x = this.radius * cos(this.angle);
    this.y = this.radius * sin(this.angle);
    noStroke()
    fill(230);
    circle(this.x, this.y, this.radius / 3);
  }
}