/*
----- Coding Tutorial by Patt Vira ----- 
Name: Text Distortion
Video Tutorial: https://youtu.be/9mucfJmwupk
----------------------------------------
*/

let ptsPerRing = 30;
let r = 100;
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
    for (let i=0; i<ptsPerRing; i++) {
        let angle = TWO_PI/ptsPerRing * i;
        let x = r*cos(angle);
        let y = r*sin(angle);
        ellipse(x, y, shapeSize);
    }
}