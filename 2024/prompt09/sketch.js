// Genuary 2024, Prompt 9: ASCII
// 
// Marc Duiker, Jan 2024
// Created using p5js for https://genuary.art.
//

let screenW;
let screenH;
let negative = false;
let charArray = [];
const maxChars = 50;
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

function mousePressed() {
  negative = !negative;
}

function keyPressed() {
  if (key === 's') {
    saveGif('genuary2024_prompt9', 4);
  }
}

class Character {
  constructor(i, parent) {
    this.i = i;
    this.parent = parent;
    this.padding = 50;
    this.init();
    this.chars = ['G', 'e', 'n', 'u', 'a', 'r', 'y'];
    this.origChar = this.chars[i];
    this.char = this.origChar;
    this.flip = false;
    if (this.i < this.chars.length - 1 && this.child === undefined) {
      this.child = new Character(i + 1, this);
    }
  }

  init() {
    const minSpeed = 2;
    const maxSpeed = 7;
    if (this.parent) {
      // this is a child
      this.x = this.parent.x;
      this.y = this.parent.y - this.parent.distance - this.parent.speed;
      this.speed = this.parent.speed;
    } else {
      // this is the parent
      this.x = random(this.padding, screenW - this.padding);
      this.y = 0;
      this.speed = random(minSpeed, maxSpeed);
    }
    this.char = this.origChar;
    this.bold = random([true, false]);
    this.color = colorPalette[Math.floor(random(colorPalette.length))];
    this.origColor = this.color;
    this.distance = map(this.speed, minSpeed, maxSpeed, 10, 40);
    this.charSize = map(this.speed, minSpeed, maxSpeed, 7, 40);
  }

  update() {
    this.y += this.speed;
    if (this.y >= screenH) {
      if (this.i === 0) {
        this.init();
      } else {
        this.init(this.x, 0 - this.distance - this.speed, this.speed);
      }
    }

    if (frameCount % 30 === 0) {
      this.flip = random([true, false, false]);
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