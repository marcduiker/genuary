// Genuary 2024, Prompt 2: No palettes
// 
// Marc Duiker, Jan 2024
// Created using p5js for https://genuary.art.
//

let screenW;
let screenH;
let bands;
let color1;
let color2;
let colorArray = [];
let speed;
let autoUpdate = true;

function setup() {
  screenW = windowWidth-100;
  screenH = windowHeight;
  createCanvas(screenW, screenH);
  color1 = color(random(255), random(255), random(255));
  color2 = color(random(255), random(255), random(255));

  const bandsSlider = document.querySelector("#bandsSlider");
  bands = bandsSlider.value;
  const speedSlider = document.querySelector("#speedSlider");
  speed = speedSlider.value;
  updateColorArray();
}

function updateColorArray() {
  colorArray = [];
  for (let b = 0; b < bands; b++) {
    let bandColor = lerpColor(color1, color2, b / bands);
    colorArray.push(bandColor);
  }
}

function draw() {
  background(10);
  speed = select("#speedSlider").value();
  bands = select("#bandsSlider").value();
  frameRate(speed);
  if (autoUpdate) {
    updateColors();
  }

  const bandWidth = screenW / bands;
  const bandHeight = screenH;
  for (let b = 0; b < bands; b++) {
    let bandColor = colorArray[b];
    let bandX = b * bandWidth;
    fill(bandColor);
    rect(bandX, 0, bandX + bandWidth, bandHeight);
    
    fill(10);
    textAlign(CENTER);
    text(bandColor.toString('#rrggbb'), bandX + bandWidth/2, bandHeight-100);
  }
}

function updateColors() {
  color1 = color(random(255), random(255), random(255));
  color2 = color(random(255), random(255), random(255));
  updateColorArray();
}

function toggleAuto() {
  autoUpdate =! autoUpdate;
  if (autoUpdate) {
    select("#runButton").elt.innerText = 'Stop Randomization';
  } else {
      select("#runButton").elt.innerText = 'Start Randomization';
  }
}

function updateSpeed(speedValue) {
  speed = speedValue;
}

function mouseClicked() {
  let mappedBand = Math.floor(map(mouseX, 0, screenW, 0, bands));
  if (mappedBand < 0) return;
  navigator.clipboard.writeText(colorArray[mappedBand].toString('#rrggbb'));
}