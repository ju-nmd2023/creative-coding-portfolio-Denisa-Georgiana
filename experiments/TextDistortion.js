/*
----- Coding Tutorial by Patt Vira ----- 
Name: Text Distortion
Video Tutorial: https://youtu.be/9mucfJmwupk
----------------------------------------
*/

let ptsPerRing = 200;
let minR = 90; let maxR = 500;
let numRings = 100;
let shapeSize = 5;
let distortionFactor = 0.1;
let freqFactor = 0.02;
let ampFactor = 0.1;

//loading the image
let img; 
function preload() {
    img = loadImage("denisa.png");
}

function setup() {
    createCanvas (2068, 940);
    rectMode(CENTER);
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
          
            let distortedAngle = angle + ampFactor*sin(freqFactor*r);
            //image mapping points
            let refX = int(map(angle, 0, TWO_PI, 0, img.width));
            let sampleY = (r-minR) / (maxR - minR);
            let refY = int(map(sampleY, 0, 1, 0, img.height));
            let c = img.get(refX, refY);

            let shapeSize = map(red(c), 0, 255, 0, 3);

            let x = -r*cos(distortedAngle);
            let y = r*sin(distortedAngle);
            rect(x, y, shapeSize);
        }
    }
   
    noLoop();

}