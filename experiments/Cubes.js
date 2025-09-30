/*
----- Coding Tutorial by Ruth & Tim ----- 
Name: Cubic Dissaray
Tutorial: https://generativeartistry.com/tutorials/cubic-disarray/
----------------------------------------
*/


//variables
let randomDisplacement = 15; 
let rotateMultiplier = 20;
let offset = 10;
let squareSize = 30; 


//canvas setup
function setup() {
    createCanvas(2068, 940);
    angleMode(RADIANS);
    rectMode(CENTER);
    noFill();
    stroke(0);
    strokeWeight(2);

    noLoop();
}

function draw() {
    background(246, 243, 232);

    for (let i = squareSize; i <= width - squareSize; i += squareSize) {
        for (let j = squareSize; j <= height - squareSize; j += squareSize) {
            let disorder = i / width;
            let rotateAmount = random(-1, 1) * disorder * radians(rotateMultiplier);
            let translateAmount = random(-1, 1) * disorder * randomDisplacement; 

            push();
            translate(i + translateAmount + offset, j + offset);
            rotate(rotateAmount);
            rect(0, 0, squareSize, squareSize);
            pop();  
        }
       
    }
}
