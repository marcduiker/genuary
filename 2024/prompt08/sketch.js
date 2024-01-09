// Genuary 2024, Prompt 8: Chaotic system
// 
// Marc Duiker, Jan 2024
// Created using p5js for https://genuary.art.
//

let screenW;
let screenH;
let rectCount = 10;
let lineSegments=[];
let distance;
let limit;
let opacity = 50;
let negative = true;
let limitDivisor = 5;

function setup() {
  screenW = windowWidth;
  screenH = windowHeight;
  const padding = 100;
  distance = (screenH - padding) / rectCount;
  limit = distance / 2;
  createCanvas(screenW, screenH);
  frameRate(30);
  let startX = (screenW / 2) - (distance * rectCount) / 2 + limit/2;
  let startY = (screenH / 2) - (distance * rectCount) / 2 + limit/2;
  for (let row = 0; row < rectCount; row++) {
    lineSegments[row] = [];
    for (let col = 0; col < rectCount; col++) {
      let x = startX + (distance * col);
      let y = startY + (distance * row);
      lineSegments[row][col] = new LineSegment(createVector(x, y));
    }
  }
}

function draw() {
  if (negative) {
    background(10, opacity);
  } else {
    background(240, opacity);
  }
  for (let row = 0; row < rectCount; row++) {
    for (let col = 0; col < rectCount; col++) {
      lineSegments[row][col].update();
      lineSegments[row][col].draw();
    }
  }
}

function mouseMoved() {
  opacity = map(mouseX, 0, screenW, 5, 150);
  limitDivisor = map(mouseY, 0, screenH, 1, 8);
}

function mousePressed() {
  negative = !negative;
}

function keyPressed() {
  if (key === 's') {
    saveGif('genuary2024_prompt8', 3);
  }
}

class LineSegment extends p5.Vector {
  constructor(sourceVector) {
    super(sourceVector.x, sourceVector.y);
    this.sourceVector = sourceVector;
    this.velocity;
    this.init();
    this.oldX;
    this.oldY;
    this.limit = limit;
  }

  init() {
    this.x = this.sourceVector.x;
    this.y = this.sourceVector.y;
  }

  update() {
    this.oldX = this.x;
    this.oldY = this.y;
    this.velocity = createVector(random(-1, 1) * this.limit / limitDivisor, random(-1, 1) * this.limit / limitDivisor);
    this.add(this.velocity);
    if (this.y < this.sourceVector.y) {
      this.y = this.sourceVector.y;
    }
    if (this.y > this.sourceVector.y + this.limit) {
      this.y = this.sourceVector.y + this.limit;
    }
    if (this.x < this.sourceVector.x) {
      this.x = this.sourceVector.x;
    }
    if (this.x > this.sourceVector.x + this.limit) {
      this.x = this.sourceVector.x + this.limit;
    }
  }

  draw() {
    noFill();
    if (negative) {
      stroke(color('#CCC'));
    } else {
      stroke(color('red'));
    }
    strokeWeight(1);
    line(this.oldX, this.oldY, this.x, this.y);
  }
}