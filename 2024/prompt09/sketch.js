// Genuary 2024, Prompt 9: ASCII
// 
// Marc Duiker, Jan 2024
// Created using p5js for https://genuary.art.
//

let screenW;
let screenH;
let opacity = 50;
let negative = true;
let charArray = [];
const padding = 20;
const maxChars = 40;
const colorPalette = [
  "#1f244b",
  "#654053",
  "#a8605d",
  "#d1a67e",
  "#f6e79c",
  "#b6cf8e",
  "#60ae7b",
  "#3c6b64"
]

function setup() {
  screenW = windowWidth;
  screenH = windowHeight;
  
 
  createCanvas(screenW, screenH);
  frameRate(30);
  textAlign(CENTER);
  textFont('Courier New');
  for (let i = 0; i < maxChars; i++) {
      charArray.push(new Character(0));
  }
}

function draw() {
  if (negative) {
    background(10);
  } else {
    background(240);
  }
  charArray.forEach(character => {
    character.update();
    character.draw();
  });
}

function mouseMoved() {
  opacity = map(mouseX, 0, screenW, 5, 150);
}

function mousePressed() {
  negative = !negative;
}

function keyPressed() {
  if (key === 's') {
    saveGif('genuary2024_prompt9', 4);
  }
}

class Character {
  constructor(i, x, y, speed, color) {
    this.padding = 50;
    this.i = i;
    this.init(x, y, speed);
    this.chars = ['G', 'e', 'n', 'u', 'a', 'r', 'y'];
    this.origChar = this.chars[i];
    this.char = this.origChar;
    this.flip = false;
    if (this.i < this.chars.length - 1 && this.child === undefined) {
      this.child = new Character(this.i + 1, this.x, this.y - this.distance - this.speed, this.speed);
    }
  }

  init(x, y, speed) {
    this.char = this.origChar;
    this.bold = random([true, false]);
    this.x = x === undefined ? random(padding, screenW - padding) : x;
    this.y = y === undefined ? 0 : y;
    this.color = colorPalette[Math.floor(random(colorPalette.length))];
    this.origColor = this.color;
    const minSpeed = 2;
    const maxSpeed = 7;
    this.speed = speed === undefined ? random(minSpeed, maxSpeed) : speed;
    this.distance = map(this.speed, minSpeed, maxSpeed, 10, 40);
    this.charSize = map(this.speed, minSpeed, maxSpeed, 7, 40);
    this.opacity = map(this.speed, minSpeed, maxSpeed, 50, 255);
    if (this.child) {
      this.child.init(this.child.x, this.child.y, this.speed, this.child.color);
    }
  }

  update() {
    this.y += this.speed;
    if (this.y >= screenH) {
      this.init(this.x, 0, this.speed);
    }

    if (frameCount % 30 === 0) {
      this.flip = random([true, false]);
    }
    this.char = this.flip ? random(['_', this.origChar]) : this.origChar;
    this.color = this.flip ? colorPalette[Math.floor(random(colorPalette.length))] : this.origColor;
    this.bold = this.flip ? random([true, false]) : this.bold;
    
    this.child?.update();
  }

  draw() {
    noStroke();
    fill(this.color);
    textSize(this.charSize);
    if (this.bold) {
      textStyle(BOLD);
    } else {
      textStyle(NORMAL);
    }
    text(this.char, this.x, this.y);
    this.child?.draw();
  }
}