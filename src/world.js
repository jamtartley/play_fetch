import Chain from './chain';
import Segment from './segment';

function init() {
    const frameRate = 60;
    const millisBetweenUpdate = 1 / frameRate;

    canvas.addEventListener("mousemove", mouseMove, false);
    setInterval(update, millisBetweenUpdate);
    resize();

    context = canvas.getContext("2d");
}

function mouseMove(e) {
    currentMousePos.x = e.layerX;
    currentMousePos.y = e.layerY;
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function update() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    resize();
    context.fillStyle = "rgb(50, 50, 50)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    chain.draw(context);
}

var canvas = document.getElementById('canvas');
var chain = new Chain(5);
var context;
var currentMousePos = {
    x: 0,
    y: 0
};

if (canvas && canvas.getContext) {
    init();
}