// Genuary 2023, Prompt 6: Steal like an artist
// 
// Marc Duiker, Jan 2023
// Created using p5js for https://genuary.art.
//

let srcImage;
let destImage;
let dx, dy;
let samples = [];
let orderedSamples = [];
let filteredSamples = [];
const srcX = 0;
const resultX = 501;
const destX = 1001;
const startY = 40;
let srcSelect;
let destSelect;
let button;
let quantizationSlider;
let hasStopped;

let painters = [
  {
    label: 'Claude Monet',
    file: 'monet.jpg',
    image: null
  },
  {
    label: 'Da Vinci',
    file: 'da_vinci.jpg',
    image: null
  },
  {
    label: 'Frida Kahlo',
    file: 'frida_kahlo.jpg',
    image: null
  },
  {
    label: 'Georgia O\'keeffe',
    file: 'georgia_okeeffe.jpg',
    image: null
  },
  {
    label: 'Gustav Klimt',
    file: 'gustav_klimt.jpg',
    image: null
  },
  {
    label: 'Johannes Vermeer',
    file: 'vermeer.jpg',
    image: null
  },
  {
    label: 'Piet Mondriaan',
    file: 'mondriaan.jpg',
    image: null
  },
  {
    label: 'Rembrandt van Rijn',
    file: 'rembrandt.jpg',
    image: null
  },
  {
    label: 'Tamara de Lempicka',
    file: 'tamara_de_lempicka.jpg',
    image: null
  },
  {
    label: 'Vincent van Gogh',
    file: 'vincent_van_gogh.jpg',
    image: null
  }
];


function preload() {
  painters.forEach(p => {
    p.image = loadImage(p.file);
  });
}

function setup() {
  let srcLabel = createP("Source");
  srcLabel.position(srcX + 10, 0);
  srcSelect = createSelect();
  srcSelect.position(srcX + 100, 15);
  painters.forEach(p => {
    srcSelect.option(p.label);  
  });
  srcSelect.selected(painters[2].label);
  srcSelect.changed(srcChanged);
  
  let destLabel = createP("Destination");
  destLabel.position(destX + 10, 0);
  destSelect = createSelect();
  destSelect.position(destX + 100, 15);
  painters.forEach(p => {
    destSelect.option(p.label);  
  });
  destSelect.selected(painters[5].label);
  destSelect.changed(destChanged);
  
  button = createButton('Start');
  button.position(resultX + 10, 10);
  button.mousePressed(toggleStartStop);
  hasStopped = true;
  
  quantizationSlider = createSlider(10, 100,  45, 5);
  quantizationSlider.position(resultX + 70, 10);
  quantizationSlider.changed(resetAll);
  
  createCanvas(1500, 800);
  srcImage = painters[2].image;
  image(srcImage, srcX, + startY);
  destImage = painters[5].image;
  image(destImage, destX, + startY);
  
  sampleColors();
  reduceSamples();
  dy = startY;
}

function toggleStartStop() {
  hasStopped = !hasStopped;
  console.log(hasStopped ? "Stopped" : "Started");
  button.elt.innerText = hasStopped ? "Start" : "Stop";
}

function srcChanged() {
  let srcLabel = srcSelect.value(); 
  console.log("Source: "+ srcLabel);
  srcImage = painters.find(p => p.label === srcLabel).image;
  resetAll();
}

function resetAll() {
  console.log("Reset");
  clear();
  samples = [];
  dy = startY;
  orderedSamples = [];
  filteredSamples = [];
  image(srcImage, srcX, startY);
  image(destImage, destX, startY);
  sampleColors();
  reduceSamples();
}

function destChanged() {
  clear();
  let destLabel = destSelect.value(); 
  console.log("Destination: "+ destLabel);
  destImage = painters.find(p => p.label === destLabel).image;
  resetAll();
}

function sampleColors() {
    const stepSize = 10;
    for (let sy = 0; sy < srcImage.height; sy += stepSize) {
      for (let sx = 0; sx < srcImage.width; sx += stepSize) {
        let sample = srcImage.get(sx, sy);
        addColorToSamples(sample);
      }
    }
    console.log("total samples: " + samples.length);
  orderedSamples = samples.sort((a, b) => {
    if (a.count > b.count) {
    return -1;
  }
  if (a.count < b.count) {
    return 1;
  }
  return 0;
  });
}

function reduceSamples() {
  let maxDistance = quantizationSlider.value();
  console.log("maxDistance: " + maxDistance);
  let keysToMerge;
  let index = 0;
  let keysToIgnore = [];
  while (index < orderedSamples.length) {
    let source = orderedSamples[index];
    keysToMerge = [];
    if (!keysToIgnore.includes(source.key)) {
      for (let s = 0; s < orderedSamples.length; s++) {
        let d = getColorDistance(source.color, samples[s].color);
        if (d < maxDistance) {
          // merge the color with an existing one
          keysToMerge.push(orderedSamples[s]);
        }
      }
    
      let sum = keysToMerge.map(k => k.count).reduce((a, b) => a + b);
      keysToMerge.forEach(k => {
        if (!keysToIgnore.includes(k.key)) {
            keysToIgnore.push(k.key);
        }  
      });
      source.count = sum;
      filteredSamples.push(source);
    }
    index++;
  }
  console.log("filteredSamples: " + filteredSamples.length);
}

function addColorToSamples(c) {
  let key = c.toString();
  if (samples.length == 0) {
    samples.push({
      key: key,
      color: c,
      count: 1
    });
  } else {
    let match = samples.find(s => s.key === key);
    if (match) {
      match.count++;
    } else {
      samples.push({
        key: key,
        color: c,
        count: 1
      });
    }
  }
}

function getClosestColor(destColor) {
  let minDist = 9999;
  let colorMatch;
  filteredSamples.forEach(fs => {
    let d = getColorDistance(fs.color, destColor);
    if (d < minDist) {
      minDist = d;
      colorMatch = fs.color;
    }
  });
  
  return colorMatch;
}

function getColorDistance(c1, c2) {
  let r1 = red(c1);
  let g1 = green(c1);
  let b1 = blue(c1);
  
  let r2 = red(c2);
  let g2 = green(c2);
  let b2 = blue(c2);
  
  return dist(r1, g1, b1, r2, g2, b2);
}

function draw() {
  if (!hasStopped) {
    for (let x = 0; x < destImage.width; x++) {
      dx = x;
      let destColor = destImage.get(x, dy - startY);
      let matchColor = getClosestColor(destColor);
      stroke(matchColor);
      point(resultX + dx,dy);
    }
  
    if (dx > destImage.width-2 && dy < destImage.height + startY) {
      dx = 0;
      dy++;
      console.log("Line: " + dy);
    } else if (dx > destImage.width-2 && dy == destImage.height + startY) {
      toggleStartStop();
      console.log("Done");
    }
  }
}
