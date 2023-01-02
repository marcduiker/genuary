// Genuary 2023, Prompt 3: Glitch
// 
// Marc Duiker, Jan 2023
// Created using p5js for https://genuary.art.
//

let img;
let minH, maxH;
let minW, maxW;
let rectW, rectH;
let cutOutCheckbox;
let useCutOut = true;
let useMouseCheckbox;
let useMouse = false;

function preload() {
  img = loadImage('frida_kahlo.jpg');
}
function setup() {
  background(0);
  cutOutCheckbox = createCheckbox('Use black cut out', useCutOut);
  cutOutCheckbox.changed(cutOutCheckboxChanged);
  
  useMouseCheckbox = createCheckbox('Use mouse/touch to control glitch size', useMouse);
  useMouseCheckbox.changed(useMouseCheckboxChanged);
  
  createCanvas(img.width, img.height);
  image(img, 0, 0);
  minH = img.height/500;
  maxH = img.height/10;
  minW = img.width/10;
  maxW = img.width;
  img.loadPixels();
  noStroke();
  noFill();
  resetSketch();
}

function cutOutCheckboxChanged() {
  useCutOut = cutOutCheckbox.checked();
  resetSketch();
}

function mouseClicked() {
  resetSketch();
}

function useMouseCheckboxChanged() {
  useMouse = useMouseCheckbox.checked();
  resetSketch();
}

function resetSketch() {
  clear();
  image(img, 0, 0);
}

function draw() {
  if (frameCount % 3 == 0) {
    frameRate(random(1, 15));
  }
  // Determine the width and height of the original image to be displaced.
  if (useMouse) {
    rectW = round(constrain(map(mouseX, 0, img.width, minW, maxW), minW, maxW));
  rectH = round(constrain(map(mouseY, 0, img.height, maxH, minH), minH, maxH));  
  } else {
    rectW = round(random(minW, maxW));
    rectH = round(random(minH, maxH));  
  }
  
  // Determine a random offset of displacement 
  let offsetX = round(random(-rectW/10, rectW/10));
  let offsetY = 0;
  
  // pick a random position in the image
  let x1 = round(random(0, img.width-rectW));
  let y1 = round(random(0, img.height-rectH));
  if (useCutOut) {
    fill(0);
    rect(x1, y1, rectW, rectH);
  }
  
  let block = img.get(x1, y1, rectW, rectH);
  set(x1+offsetX, y1+offsetY, block);
  updatePixels();
}

function keyPressed() {
  if (key === 's') {
    saveGif('genuary2023_prompt3', 10);
  }
}