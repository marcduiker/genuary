// Genuary, Prompt 2: Made in 10 minutes
// 
// Marc Duiker, Jan 2023
// Created using p5js for https://genuary.art.
//
// Move the mouse or tap the screen over the x-axis to change the opacity and line width.
// P.S. I needed almost an hour to make this, so I definitely didn't finish this in 10 mins :/.

const screenW = 600;
const screenH = 600;
const stepSize = 10;
const steps = screenW/stepSize;

let x1=0;
let x2=stepSize;
let y1=0;
let y2=screenH;
let x1s=[0, 0, screenW, screenW]
let x1Steps=[0, stepSize, 0, -stepSize]
let y1s=[0, screenH, screenH, 0]
let y1Steps=[stepSize, 0, -stepSize, 0]
let x2s=[0, screenW, screenW, 0]
let x2Steps=[stepSize, 0 , -stepSize, 0]
let y2s=[screenH, screenH, 0, 0]
let y2Steps=[0, -stepSize, 0, stepSize]
let i = 0;
let step = 0;

function setup() {
  createCanvas(screenW, screenH);
}

function draw() {
  let opacity = map(mouseX, 0, screenW, 5, 100);
  let thickness = map(mouseY, 0, screenH, 10, 0.5)
  background(220,opacity);
  strokeWeight(thickness);
  line(x1s[i]+x1Steps[i]*step, y1s[i]+y1Steps[i]*step, x2s[i]+x2Steps[i]*step, y2s[i]+y2Steps[i]*step);
  step++;
  
  if (step == steps) {
    i++;
    step = 0;
  }
  if (i == 4) {
    i = 0;
  }
    
}