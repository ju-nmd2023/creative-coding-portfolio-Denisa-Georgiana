// Code based on original Joy Division experiment tutorial 
let offset = 0; 
let inc = 0.05; 
let sidesValue = 100; 
let num = 70; 
let marginX = 50;
let marginY = 50;
let spacing; 
let time = 0; 

function setup() {
    createCanvas(2068, 940); 
    spacing = (height - marginY * 2) / (num - 1); 
}

function draw() {
    background(0);

    //lines visual
    stroke(255);
    strokeWeight(0.8);
    noFill();

    let off = offset; 

    for (let i = 0; i < num; i++) {
        beginShape();
        for (let j = marginX; j < width - marginX; j++) {
            let distanceFromCenter = abs(j - width / 2); 

            let r = width / 2 - sidesValue - distanceFromCenter;
            let radius = r >= 0 ? r / 2 : 0; 

            let n = noise(off, time); 

            let y = marginY + i * spacing + (n * radius * -0.5);
            vertex(j, y); 
            off += inc; 
        }

        endShape();
    }

    time += 0.01;
    offset += 0.002;
}