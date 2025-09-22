const container = document.getElementById("p5container");

//canvas settings
const canvas = document.createElement("canvas");
canvas.style.display = "block";
container.appendChild(canvas); 
const ctx = canvas.getContext("2d");

//canvas visual
function draw(width, height) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
}