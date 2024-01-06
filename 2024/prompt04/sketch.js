// Genuary 2024, Prompt 4: Pixels
// 
// Marc Duiker, Jan 2024
// Created using p5js for https://genuary.art.
//

let screenW;
let screenH;
let rows = 25;
let cols = 50;
let pixels = [];
let tRed = 0.1;
let tGreen = 0.2;
let tBlue = 0.9;
let tInc = 0.001;
let detail = 4;
let falloff = 0.5;

function setup() {
  screenW = windowWidth;
  screenH = windowHeight;
  createCanvas(screenW, screenH);
  frameRate(24);
  rectMode(CORNER);
  noiseSeed(200);
  for (let col = 0; col < cols; col++) {
    pixels[col] = [];
    for (let row = 0; row < rows; row++) {
      let x = screenW / cols * col;
      let y = screenH / rows * row;
      let pix = new Pixel(x, y);
      pixels[col][row]=pix;
    }
  }
}

function draw() {
  background(10);
  noiseDetail(detail, falloff);
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      pixels[col][row].update();
      pixels[col][row].draw();
    }
    tRed += (tInc * 2/3);
    tGreen += tInc;
    tBlue += (tInc * 4/3);
  }
}

function mouseMoved() {
  falloff = map(mouseX, 0, screenW, 0.1, 0.8);
  detail = Math.floor(map(mouseY, 0, screenH, 10, 2));
}

function keyPressed() {
  if (key === 's') {
    saveGif('genuary2024_prompt4', 3);
  }
}

class Pixel {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 15;
    this.spacing = 4;
    this.glowSize = 4;
    this.roundness = 3;
    this.width = (this.size - (this.spacing * 2)) / 3;
    this.update();
  }

  update() {
    this.red = color(noise(this.x, this.y, tRed) * 255, 0, 0);
    this.green = color(0, noise(this.x, this.y, tGreen) * 255, 0);
    this.blue = color(0, 0, noise(this.x, this.y, tBlue) * 255);
  }

  draw() {
    noStroke();
    this.drawGlow();
    this.drawRects();
  }

  drawGlow() {
    fill(color(red(this.red), 0, 0, 150));
    rect(this.x + this.spacing - this.glowSize / 2, this.y - this.glowSize / 2, this.width + this.glowSize, this.size + this.glowSize, this.roundness / 2);
    fill(color(0, green(this.green), 0, 150));
    rect(this.x + this.width + this.spacing * 2 - this.glowSize / 2, this.y - this.glowSize / 2, this.width + this.glowSize, this.size + this.glowSize, this.roundness / 2);
    fill(color(0, 0, blue(this.blue), 150));
    rect(this.x + this.width * 2 + this.spacing * 3 - this.glowSize / 2, this.y - this.glowSize / 2, this.width + this.glowSize, this.size + this.glowSize, this.roundness / 2);
  }

  drawRects() {
    fill(this.red);
    rect(this.x + this.spacing, this.y, this.width, this.size, this.roundness);
    fill(this.green);
    rect(this.x + this.width + this.spacing * 2, this.y, this.width, this.size, this.roundness);
    fill(this.blue);
    rect(this.x + this.width * 2 + this.spacing * 3, this.y, this.width, this.size, this.roundness);
  }
}