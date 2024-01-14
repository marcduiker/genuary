// Genuary 2024, Prompt 7: Progress bar / indicator / loading animation
// 
// Marc Duiker, Jan 2024
// Created using p5js for https://genuary.art.
//

let screenW;
let screenH;
let circlePoints = [];
let colors = [
  "#ffffff",
  "#fcf660",
  "#b2d942",
  "#52c33f",
  "#166e7a",
  "#254d70",
  "#252446",
  "#201533",
];
let angleInc = 0.1;

function setup() {
  screenW = windowWidth;
  screenH = windowHeight;
  createCanvas(screenW, screenH);
  frameRate(30);
  for (let i = 0; i < colors.length; i++) {
    circlePoints.push(new CirclePoint(150 + i * 10, 200, i/10, colors[colors.length -1 - i]));
  }
}

function draw() {
  background(0, 10);
  push();
  translate(screenW / 2, screenH / 2);
    circlePoints.forEach(circlePoint => {
    circlePoint.update();
    circlePoint.draw();
  });
  pop();
}

function keyPressed() {
  if (key === 's') {
    saveGif('genuary2024_prompt7', 6);
  }
}

function mouseMoved() {
  angleInc = map(mouseX, 0, screenW, 0.1, 0.5);
}

function mousePressed() {
  circlePoints.forEach(circlePoint => {
    circlePoint.reset();
  });

}

class CirclePoint {
  constructor(radius, size, startAngle, color) {
    this.angle = startAngle;
    this.origAngle = this.angle;
    this.radius = radius;
    this.origRadius = this.radius;
    this.size = size;
    this.origSize = this.size;
    this.color = color;
    this.radiusInc = 0.5;
    this.isGrowing = true;
  }

  reset() {
    this.angle = this.origAngle;
    this.radius = this.origRadius;
    this.size = this.origSize;
    this.isGrowing = true;
  }

  update() {
    this.x = cos(this.angle) * this.radius;
    this.y = sin(this.angle) * this.radius;
    this.angle += angleInc;
    if (this.isGrowing) {
      this.radius += this.radiusInc;
    } else {
      this.radius -= this.radiusInc;
    }

    this.size = map(this.radius, 0, this.origRadius, 10, this.origSize);

    if (this.radius > this.origRadius && this.isGrowing) {
      this.isGrowing = false;
    } else if (this.radius < 0 && !this.isGrowing) {
      this.isGrowing = true;
    }
    if (this.angle >= TWO_PI) {
      this.angle = 0;
    }
  }

  draw() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.size);
  }
}