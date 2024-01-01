// Genuary 2024, Prompt 1: Particles
// 
// Marc Duiker, Jan 2024
// Created using p5js for https://genuary.art.
//

const maxParticles = 10000;
let particles = [];
let screenW;
let screenH;
let sourceVector;

function setup() {
  screenW = windowWidth;
  screenH = windowHeight;
  createCanvas(screenW, screenH);
  frameRate(30);
  sourceVector = createVector(screenW/2, screenH/2);

  for (let p = 0; p < maxParticles; p++) {
    particles.push(new Particle(sourceVector));
  }
}

function draw() {
  background(10);
  particles.forEach(particle => {
    particle.draw();
    particle.update();
  });
}

class Particle extends p5.Vector {
  constructor(sourceVector) {
    super(sourceVector.x, sourceVector.y);
    this.sourceVector = sourceVector;
    this.init();
  }

  init() {
    this.x = this.sourceVector.x;
    this.y = this.sourceVector.y;
    this.size = random(2, 8); 
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(0.5, 1.5));
    this.acceleration = createVector(random(-0.5, 0.5), 0);
    this.opacity = 255;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.add(this.velocity);
    this.opacity = this.getOpacity();
    if (this.y < 0 || this.y > screenH || this.x < 0 || this.x > screenW) {
      this.init();
    }
  }

  getOpacity() {
    return map(p5.Vector.dist(sourceVector, this), 0, this.sourceVector.mag() / 1.1, 255, 0);
  }

  draw() {
    noFill();
    fill(230, this.opacity);
    rectMode(CENTER);
    rect(this.x, this.y, this.size);
  }
}

function keyPressed() {
  if (key === 's') {
    saveGif('genuary2024_prompt1', 2);
  }
}