// Genuary 2024, Prompt 1: Particles
// 
// Marc Duiker, Jan 20244
// Created using p5js for https://genuary.art.
//

const maxParticles = 10000;
let particles = [];
let screenW;
let screenH;

function setup() {
  screenW = windowWidth;
  screenH = windowHeight;
  createCanvas(screenW, screenH);
  frameRate(30);

  for (let p = 0; p < maxParticles; p++) {
    particles.push(new Particle(screenW/2, screenH, 5));
    
  }
}

function draw() {
  background(10);
  
  particles.forEach(particle => {
    particle.draw();
    particle.update();
  });
  
}

class Particle {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.size = random(2, 6); 
    this.speed = speed;
    this.opacity = 255;
    this.init();
  }

  init() {
    this.vx = random(-this.speed/2, this.speed/2);
    this.vy = random(0, this.speed);
    this.opacity = 255;
  }

  update() {
    this.x += this.vx;
    this.y -= this.vy;
    this.opacity -= 1;
    if (this.y < 0 || this.y > screenH || this.x < 0 || this.x > screenW) {
      this.y = screenH;
      this.x = screenW/2;
      this.init();
    }
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