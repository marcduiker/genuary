// Genuary 2024, Prompt 3: Droste effect
// 
// Marc Duiker, Jan 2024
// Created using p5js for https://genuary.art.
//

let screenW;
let screenH;
let color1;
let color2;
let iteration = 2;
let maxIterations = 8;
let t1=0;
let t2=0;
let t1Inc = 0.015;
let t2Inc = 0.015;
const strokeThickness = 10;

function setup() {
  screenW = windowWidth;
  screenH = windowHeight;
  createCanvas(screenW, screenH);
  frameRate(30);
  rectMode(CORNER);
  color1 = color(random(255), random(255), random(255));
  color2 = color(random(255), random(255), random(255));
}

function draw() {
  background(240);
  let s1x1 =  0;
  let s1y1 =  screenH * 1/4 * noise(t1);
  let s1w  = screenW * 4/5 * noise(t2);
  let s1h = screenH - s1y1 - strokeThickness;

  let s2x1 =  s1w - screenW * 1/5 * noise(t2);
  let s2y1 =  screenH * 3/5 * noise(t1);
  let s2w = screenW - s1w;
  let s2h = screenH * noise(t1);

  noiseDetail(5, 0.3);

  drawShape(s1x1, s1y1, s1w, s1h, s2x1, s2y1, s2w, s2h);
  while (iteration < maxIterations) {
    translate(s1w, s2y1);
    scale(1/iteration, 1/iteration);
    drawShape(s1x1, s1y1, s1w, s1h, s2x1, s2y1, s2w, s2h);
    iteration++;
  }
  t1 += t1Inc;
  t2 += t2Inc;
  iteration = 2;
}

function drawShape(s1x1, s1y1, s1w, s1h, s2x1, s2y1, s2w, s2h) {
  stroke(10);
  strokeWeight(strokeThickness);
  fill(color1);
  rect(s1x1, s1y1, s1w, s1h);

  fill(color2);
  rect(s2x1, s2y1, s2w, s2h);
}

function mouseMoved() {
  t1Inc = map(mouseY, 0, screenH, 0.1, 0.001);
  t2Inc = map(mouseX, 0, screenW, 0.001, 0.1);
}

function mouseClicked() {
  color1 = color(random(255), random(255), random(255));
  color2 = color(random(255), random(255), random(255));
}

function keyPressed() {
  if (key === 's') {
    saveGif('genuary2024_prompt3', 3);
  }
}