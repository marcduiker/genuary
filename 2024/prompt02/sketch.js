// Genuary 2024, Prompt 2: No palettes
// 
// Marc Duiker, Jan 2024
// Created using p5js for https://genuary.art.
//

let screenW;
let screenH;
let bands;
let band;
let bandY;
let color1;
let color2;
let colorArray = [];
let speed;
let autoUpdate = true;
let resetBackground = false;

function setup() {
  screenW = windowWidth - 100;
  screenH = windowHeight;
  createCanvas(screenW, screenH);
  frameRate(30);
  color1 = color(random(255), random(255), random(255));
  color2 = color(random(255), random(255), random(255));
  band = 0;
  bandY = screenH;

  const bandsSlider = document.querySelector("#bandsSlider");
  bands = bandsSlider.value;
  bandsSlider.addEventListener("change", (event) => {
    band = 0;
    bandY = screenH;
    resetBackground = true;
  });
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
  if (resetBackground) {
    background(240);
    resetBackground = false;
  }
  speed = select("#speedSlider").value();
  bands = select("#bandsSlider").value();
  if (autoUpdate) {
    const bandWidth = screenW / bands;
    const bandHeight = screenH;
    let bandColor = colorArray[band];
    let bandX = band * bandWidth;
    if (bandX == 0 && bandY == bandHeight && band == 0) {
      updateColors();
    }

    noStroke();
    fill(bandColor);
    rect(bandX, bandY, bandWidth, bandHeight);

    fill(10);
    textAlign(CENTER);
    text(bandColor.toString('#rrggbb'), bandX + bandWidth / 2, bandHeight - 50);
    bandY -= speed;
    if (bandY+speed < 0) { 
      bandY = screenH;
      if (band < bands - 1) {
        band += 1;
      } else {
        band = 0;
      }
    }
  }
}

function updateColors() {
  color1 = color(random(255), random(255), random(255));
  color2 = color(random(255), random(255), random(255));
  updateColorArray();
}

function toggleAuto() {
  autoUpdate = !autoUpdate;
  if (autoUpdate) {
    select("#runButton").elt.innerText = 'Stop';
  } else {
    select("#runButton").elt.innerText = 'Start';
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