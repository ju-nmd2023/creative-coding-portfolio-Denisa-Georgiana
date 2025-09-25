/* Code inspired by
----- Coding Challenge by The Coding Train ----- 
Name: Coding Challenge #24: Perlin Noise Flow Field
Video Tutorial: https://www.youtube.com/watch?v=BjoM9oKOAKY
----------------------------------------
*/

//variables flow field
let fieldScale = 20;
let noiseScale = 0.002; 
let noiseSpeed = 0.002; 
let angleMult = 2;

//variables grid
let columns;
let rows;
let flowField = [];
let zOff = 0; 


//canvas setup
function setup() {
    createCanvas(2068, 940);
    columns = floor(width/fieldScale);
    rows = floor(height/fieldScale);

    flowField = new Array(columns*rows); 

}

//draw
function draw() {
    background(20);
    colorMode(RGB); 
    noStroke();
    fill(20, 20, 20, 18);
    rect(0, 0, width, height);

    //flow field setup
    let yOff = 0; 
    for (let y = 0; y < rows; y++) {
        let xOff = 0;
        for (let x = 0; x < columns; x++) {
            let angle = noise(zOff, yOff, zOff) * TWO_PI * angleMult;
            let vector = p5.Vector.fromAngle(angle); 
            flowField[x + y * columns] = vector;
            xOff += noiseScale * fieldScale;
        }

        yOff += noiseScale * fieldScale;
    }

    zOff += noiseSpeed;
}