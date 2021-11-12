// Scroll To Top Button
var lastScroll = window.scrollY;

window.addEventListener("scroll", function() {
    var scrollTop = document.getElementById("scrolltop");
    if (window.scrollY > 200 && lastScroll > window.scrollY) {
        scrollTop.classList.add("showbutton");
    } else {
        scrollTop.classList.remove("showbutton");
    }
    lastScroll = window.scrollY;
})

// Interactive Canvas
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const COLOR = "rgb(230, 230, 230)";
const NODE_RADIUS = 5;

const MAX_DIST = 120;

const nodes = [];

function randInt(a, b) {
    return Math.floor(Math.random() * (b - a)) + a;
}

function randFloat(a, b) {
    return Math.random() * (b - a) + a;
}

function randSpeed(a, b) {
    let speed = randFloat(a, b);
    if (randInt(0, 2) === 0) {
        speed = -speed;
    }
    return speed;
}

function dist2(a, b) {
    return a * a + b * b;
}

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

document.getElementById("top").addEventListener("click", function (event) {
    x = event.x;
    y = event.y;
    nodes.push(new Node(x, y + window.scrollY, NODE_RADIUS, true));
});

class Node {
    constructor(x, y, radius, active=false) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = randSpeed(0.2, 0.5);
        this.speedY = randSpeed(0.2, 0.5);
    }
    update() {
        if (this.x < -40 || this.x > canvas.width + 40) {
            this.speedX = -this.speedX;
            this.speedY = -this.speedY;
        }
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw() {
        ctx.fillStyle = COLOR;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawEdge(i, j, dt) {
    ctx.beginPath();
    ctx.strokeStyle = COLOR;
    ctx.lineWidth = (MAX_DIST - dt) * 0.015 + 0.2;
    ctx.moveTo(nodes[i].x, nodes[i].y);
    ctx.lineTo(nodes[j].x, nodes[j].y);
    ctx.stroke();
    ctx.closePath();
}

function processEdge(i, j) {
    let dt = dist2(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
    if (dt < MAX_DIST * MAX_DIST) {
        dt = Math.sqrt(dt);
        drawEdge(i, j, dt);
    }
}

function render() {
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
        for (let j = i + 1; j < nodes.length; j++) {
            processEdge(i, j);
        }
        nodes[i].draw();
    }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  render();
  requestAnimationFrame(animate);
}

function main() {
    for (let i = 0; i < canvas.width / 25; i++) {
        nodes.push(new Node(randInt(0, canvas.width), randInt(0, canvas.height), NODE_RADIUS));
    }
    animate();
}

main();
