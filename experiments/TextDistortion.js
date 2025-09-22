/*
----- Coding Tutorial by Patt Vira ----- 
Name: Text Distortion
Video Tutorial: https://youtu.be/9mucfJmwupk
----------------------------------------
*/

let ptsPerRing = 100;
let minR = 90; let maxR = 2068;
let numRings = 250;
let shapeSize = 5;
let distortionFactor = 0.1;
let freqFactor = 0.02;
let ampFactor = 0.2;

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
            //let distortedAngle = angle + r * distortionFactor;
            let distortedAngle = angle + ampFactor*sin(freqFactor*r);
            let x = r*cos(distortedAngle);
            let y = r*sin(distortedAngle);
            ellipse(x, y, shapeSize);
        }
    }
   
}