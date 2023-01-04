// Genuary 2023, Prompt 5: Debug view
// 
// Marc Duiker, Jan 2023
// Created using p5js for https://genuary.art.
//
// Usage: Click in the canvas and use the left and right arrows.

let x;
let y;
let screenW;
let screenH;
const sqSize = 50;
const fps = 5;
let clones = [];
const maxClones = 10;

function setup() {
  screenW = 500;
  screenH = 500;
  frameRate(fps);
  createCanvas(screenW, screenH);
  x = 4;
  y=9;
  for (let y = 0; y < 10; y++ ) {
    clones.push(
      new Clone(y)
    );
  }
}


function draw() {
  background(0);
  fill(220);
  for (y = 0; y < 10; y++) {
    clones[y].draw();
    if (y == 9) {
      clones[y].update(x);
    } else if (y > 0) {
      clones[y].update(clones[y+1].x);
    }
  }
  logToConsole();
}

function logToConsole() {
  let leftCount = clones[9].x;
  let rightCount = 9 - clones[9].x
  console.log("---".repeat(leftCount)+"[X]"+"---".repeat(rightCount));
}

class Clone {
  constructor(y) {
    this.size = sqSize;
    this.x = 4;
    this.y = y;
    this.speed = 1;
  }
  
  update(x) {
    this.x = x;
  }
  
  draw() {
    fill(map(this.y, 1, 10, 50, 250));
    square(this.x * sqSize, this.y * sqSize, this.size);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if (x > 0) {
      x -= 1;
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (x < 9) {
      x += 1;
    }
  }
}
