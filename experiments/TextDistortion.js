/*
----- Coding Tutorial by Patt Vira ----- 
Name: Text Distortion
Video Tutorial: https://youtu.be/9mucfJmwupk
----------------------------------------
*/

let ptsPerRing = 150;
let minR = 10; let maxR = 1100;
let numRings = 190;
let shapeSize = 15;
let distortionFactor = 0.1;
let freqFactor = 0.02;
let ampFactor = 0.1;

//colours
let startColor, endColor; 

//loading the image
let img; 
function preload() {
    img = loadImage("denisa.png");
}

function setup() {
    createCanvas (2068, 940);
    rectMode(CENTER);
    startColor = color(127,255,0);
    endColor = color(1191, 64, 191);
}

function draw() {
    background(50);
    noStroke();
    fill(0);
    //translating the origin of the cirle
    translate(width/2, height/2);
    for (let i=0; i<numRings; i++) {
        //creating different radius for each circle
        let r = minR + ((maxR - minR) / numRings) * i;
        for (let j=0; j<ptsPerRing; j++) {
            let angle = TWO_PI/ptsPerRing * j;
          
            let distortedAngle = angle + ampFactor*sin(freqFactor*r + frameCount * 0.8);
            
            //modulo horizontal repeat text horizontal
            let repeatX = 1; 
            let sampleX = (angle * repeatX) % TWO_PI; 

            //image mapping points
            let refX = int(map(sampleX, 0, TWO_PI, 0, img.width));
            //modulo!!! check name again makes it so that text repeats vertically
            let repeatY = 3; 
            let sampleY = ((r-minR) / (maxR - minR) * repeatY) % 1.0;
            let refY = int(map(sampleY, 0, 1, 0, img.height));
            let c = img.get(refX, refY);

            let shapeSize = map(red(c), 0, 255, 0, 3);

            let x = -r*cos(distortedAngle);
            let y = r*sin(distortedAngle);

            let xCart = x + width/2; 
            let amount = map(xCart, 0, width, 0, 1);
            //to find the color values of the two colors
            let shapeColor = lerpColor(startColor, endColor, amount);
            fill(shapeColor); 
            rect(x, y, shapeSize);
        }
    }
   
    //noLoop();

}