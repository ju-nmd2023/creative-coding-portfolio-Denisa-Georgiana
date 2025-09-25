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

//variables mouse
let mouseColorRadius = 60;


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

    background(20);

}

//draw
function draw() {
    colorMode(HSB, 360, 100, 100, 100); 
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
        this.prev = this.position.copy();
    }

    //apply force
    applyForce(force) {
        this.acceleration.add(force);
    }

    //follow
    follow(flowField) {
        let x = floor(this.position.x / fieldScale);
        let y = floor(this.position.y / fieldScale);
        let index = constrain(x + y * columns, 0, flowField.length - 1);
        let force = flowField[index].copy().mult(0.3);
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
        let hueVal = 0;

        let d = dist(mouseX, mouseY, this.position.x, this.position.y);
        if (d < mouseColorRadius) {
            let t = 1 - (d / mouseColorRadius);
            hueVal = lerp(0, 260, t);
        }


        stroke(hueVal, 100, 100, 70);
        strokeWeight(1.5);
        line(this.prev.x, this.prev.y, this.position.x, this.position.y);
        this.updatePrev();
    }

    updatePrev() {
        this.prev.set(this.position);
    }

    //wraping edges
    edges() {
        let wrapped = false;
        if (this.position.x > width) {
            this.position.x = 0; wrapped = true;
        }
        if (this.position.x < 0) {
            this.position.x = width; wrapped = true;
        }
        if (this.position.y > height) {
            this.position.y = 0; wrapped = true;
        }
        if (this.position.y < 0) {
            this.position.y = height; wrapped = true;
        }
        if (wrapped) this.updatePrev();
    }

    //reappearance
    respawn() {
        this.position = createVector(random(width), random(height));
        this.velocity.mult(0);
        this.updatePrev();
    }
}