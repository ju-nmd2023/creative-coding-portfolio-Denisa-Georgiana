/*
----- Coding Tutorial by Patt Vira ----- 
Name: Unknown Pleasures by Joy Division
Video Tutorial: https://youtu.be/PttnJmbBKnY
----------------------------------------
*/

let offset = 0; let inc = 0.05;
let sidesValue = 100; let num = 70;
let marginX = 50;let marginY = 50; 
let spacing; 

function setup() {
    createCanvas(2068, 940);
    spacing = (height - marginY*2) / (num-1); 
}

function draw() {
    background(0);
    let offset = 0;

    //lines visual
    stroke(255);
    strokeWeight(0.8);
    fill(0);

    for (let i=0; i<num; i++) {
        beginShape();
        for (let j=marginX; j<width - marginX; j++) {
            let distanceFromCenter = abs(j - width/2);

            let radius;
            let r = width/2 - sidesValue - distanceFromCenter;

            if (r >= 0) {
                radius = r / 2;
            } else {
                radius = 0;
            }

            let n = noise(offset);
            let y = marginY + i*spacing + (n * radius * -1);
            vertex(j, y);
            offset += inc;
        }
        endShape();
    }
}