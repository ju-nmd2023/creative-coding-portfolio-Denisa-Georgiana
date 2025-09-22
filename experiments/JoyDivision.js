const container = document.getElementById("p5container");

//canvas settings
const canvas = document.createElement("canvas");
canvas.style.display = "block";
container.appendChild(canvas); 
const ctx = canvas.getContext("2d");

//canvas visual
function drawBackground(width, height) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);

    //line visuals
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 0.8;
    ctx.lineJoin = "round";
    ctx.lineCap = "round"; 

    //spacing between vertical rows
    const step = Math.max(6, Math.floor(height / 55));
    const lines = [];

    //creating grid points for horizontal lines
    for (let y = step; y <= height - step; y += step) {
        const line = [];
        for (let x = step; x <= width - step; x += step) {
            const distanceToCenter = Math.abs(x - width / 2);
            const variance = Math.max(width / 2 - 50 - distanceToCenter, 0);
            const random = Math.random() * (variance / 8);
            line.push({ x, y: y + random});
        }
        lines.push(line); 
    }
}


