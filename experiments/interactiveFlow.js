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
let particle = [];


//canvas setup
function setup() {
    createCanvas(2068, 940);
    columns = floor(width/fieldScale);
    rows = floor(height/fieldScale);

    flowField = new Array(columns*rows); 

    //creating many particles
    for (let i = 0; i < 1000; i++) {
        particle.push(new Particle(random(width), random(height)));
    }

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


    //temporary line view
    stroke(200); 
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
            let index = x + y * columns;
            let v = flowField[index]; 
            push();
            translate(x * fieldScale, y * fieldScale);
            rotate(v.heading());
            line(0, 0, fieldScale, 0);
            pop();
        }
    }

    //particle
    for (let p of particle) {
        p.follow(flowField);
        p.update();
        p.show();
    }
}

//Particle class
class Particle {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);


    }

    //apply force
    applyForce(force) {
        this.acceleration.add(force);
    }

    //follow
    follow(flowField) {
        let x = floor(this.position.x / fieldScale);
        let y = floor(this.position.y / fieldScale);
        let index = x + y * columns;
        let force = flowField[index];
        this.applyForce(force);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    show() {
        stroke(255);
        strokeWeight(2);
        point(this.position.x, this.position.y);
    }
}