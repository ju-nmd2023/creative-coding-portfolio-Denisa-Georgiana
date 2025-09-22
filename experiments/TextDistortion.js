/*
----- Coding Tutorial by Patt Vira ----- 
Name: Text Distortion
Video Tutorial: https://youtu.be/9mucfJmwupk
----------------------------------------
*/

let ptsPerRing = 20;
let minR = 30; let maxR = 150;
let numRings = 10;
let shapeSize = 5;

function setup() {
    createCanvas (2068, 940);
}

function draw() {
    background(220);
    noStroke();
    fill(0);
    //translating the origin of the cirle
    translate(width/2, height/2);
    for (let i=0; i<numRings; i++) {
        //creating different radius for each circle
        let r = minR + ((maxR - minR) / numRings) * i;
        for (let j=0; j<ptsPerRing; j++) {
            let angle = TWO_PI/ptsPerRing * j;
            let x = r*cos(angle);
            let y = r*sin(angle);
            ellipse(x, y, shapeSize);
        }
    }
   
}