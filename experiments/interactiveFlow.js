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
            let angle = noise(xOff, yOff, zOff) * TWO_PI * angleMult;
            let vector = p5.Vector.fromAngle(angle); 
            flowField[x + y * columns] = vector;
            xOff += noiseScale * fieldScale;
        }

        yOff += noiseScale * fieldScale;
    }

    zOff += noiseSpeed;




    //particle
    for (let p of particle) {
        p.follow(flowField);
        p.update();
        p.edges();
        p.show();
    }
}

//Particle class
class Particle {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D();
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
        this.velocity.limit(2);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        //particle reappearance
        if (random(1) < 0.001) {
            this.respawn();
        }
    }

    show() {
        stroke(255);
        strokeWeight(2);
        point(this.position.x, this.position.y);
    }

    //wraping edges
    edges() {
        if (this.position.x > width) this.position.x = 0; 
        if (this.position.x < 0) this.position.x = width; 
        if (this.position.y > height) this.position.y = 0;
        if (this.position.y < 0) this.position.y = height;
    }

    //reappearance
    respawn() {
        this.position = createVector(random(width), random(height));
        this.velocity.mult(0);
    }
}