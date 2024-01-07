// Genuary 2024, Prompt 5: In the style of Vera Molnár
// 
// Marc Duiker, Jan 2024
// Created using p5js for https://genuary.art.
//

let screenW;
let screenH;
let cardCount = 5;
let cards = [];

function setup() {
  screenW = windowWidth;
  screenH = windowHeight;
  createCanvas(screenW, screenH);
  frameRate(1);
  rectMode(CORNER);
  for (let cardIndex = 0; cardIndex < cardCount; cardIndex++) {
    cards[cardIndex] = new Card();
  }
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

class Card {
  constructor() {
    this.padding = 150;
    this.size = 100;
    this.update();
  }

  setColors() {
    let randomIntensity = random(150, 240);
    let randomFillColor = color(randomIntensity, randomIntensity / 4, randomIntensity / 4, random(150, 250));
    let randomStrokeColor = color(randomIntensity / 1.5, randomIntensity / 3, randomIntensity / 3);
    this.fillColor = randomFillColor;
    this.strokeColor = randomStrokeColor;
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