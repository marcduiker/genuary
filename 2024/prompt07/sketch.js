// Genuary 2024, Prompt 7: Progress bar
// 
// Marc Duiker, Jan 2024
// Created using p5js for https://genuary.art.
//

let screenW;
let screenH;
let rectCount = 10;


function setup() {
  screenW = windowWidth;
  screenH = windowHeight;
  createCanvas(screenW, screenH);
  frameRate(24);
  rectMode(CORNER);

}

function draw() {
  background(240, 120);
  cards.forEach(card => {
    card.draw();
    card.update();
  });
}

function keyPressed() {
  if (key === 's') {
    saveGif('genuary2024_prompt5', 8);
  }
}

class ProgressBar {
  constructor(size) {
    this.spacing = 10;
    this.size = size;
    this.update();
  }

  update() {
    this.rotation = random([0, PI / 4]);
    this.x = random(this.padding, screenW - this.padding - this.size);
    this.y = random(this.padding, screenH - this.padding - this.size);
    this.setColors();
  }

  draw() {
    stroke(this.strokeColor);
    strokeWeight(1);
    fill(this.fillColor);
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    rect(0, 0, this.size, this.size);
    pop();
  }
}