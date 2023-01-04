// Genuary 2023, Prompt 4: Intersections
// 
// Marc Duiker, Jan 2023
// Created using p5js for https://genuary.art.
//

let screenW = 600;
let screenH = 600;
let cars;
const long = 55;
const short = 25;
const spd = 5;
let sizes = {
  "left": {
    w: long,
    h: short
  },
  "right": {
    w: long,
    h: short
  },
  "down": {
    w: short,
    h: long
  },
  "up": {
    w: short,
    h: long
  }
}
let fps = 30;

function setup() {
  offset = screenW/4;
  createCanvas(screenW, screenH);
  frameRate(fps)
  cars = [
    new Car(0-long, screenH/2+long*3, "right", spd, 0),
    new Car(0-long, screenH/2+long, "right", spd, fps*4),
    new Car(screenW, screenH/2+long*2, "left", spd, fps),
    new Car(0-long, screenH/2-long*3, "right", spd, fps),
    new Car(screenW, screenH/2-long*2, "left", spd, fps*1.5),
    new Car(screenW, screenH/2-long, "left", spd, fps*2),
    new Car(screenW/2-long*1, screenH, "up", spd, fps*3),
    new Car(screenW/2+long*1, screenH, "up", spd, fps*2.5),
    new Car(screenW/2, 0-long, "down", spd, fps),
  ];
}



function draw() {
  background(220);
  cars.forEach(car => {
    car.update();
    car.draw();
  });
}

class Car {
  constructor(x, y, dir, speed, delay) {
    this.origX = x;
    this.origY = y;
    this.delay = delay;
    this.reset(x, y, dir, speed);
  }
  
  update() {
    if (this.dir == "right") {
      if (this.x > screenW) {
        this.reset(this.origX, this.origY, this.dir, this.speed);
      }
      if (this.delay <= 0) {
        this.x+=this.speed;
      } else {
        this.delay--;
      }
    }
    if (this.dir == "left") {
      if (this.x+this.long < 0) {
        this.reset(this.origX, this.origY, this.dir, this.speed);
      }
      if (this.delay <= 0) {
        this.x-=this.speed;
      } else {
        this.delay--;
      }
    }
    if (this.dir == "down") {
      if (this.y > screenH) {
        this.reset(this.origX, this.origY, this.dir, this.speed);
      }
      if (this.delay <= 0) {
        this.y+=this.speed;
      } else {
        this.delay--;
      }
    }
    if (this.dir == "up") {
      if (this.y+this.short < 0) {
        this.reset(this.origX, this.origY, this.dir, this.speed);
      }
      if (this.delay <= 0) {
        this.y-=this.speed;
      } else {
        this.delay--;
      }
    }
  }
  
  draw() {
    fill(20);
    rect(this.x, this.y, this.long, this.short);
  }
  
  reset(x, y, dir, speed) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.speed = speed;
    this.long = sizes[this.dir].w;
    this.short = sizes[this.dir].h;
  }
}

function keyPressed() {
  if (key === 's') {
    saveGif('genuary2023_prompt4', 10);
  }
}