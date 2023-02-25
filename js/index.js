import Wall from "./Wall.js";
import Light from "./Light.js";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const WALL_AMOUNT = 7;

const canvas = document.querySelector('#canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;

let mouseX = 30;
let mouseY = 30;

onmousemove = e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

const walls = [];

for (let i = 0; i < WALL_AMOUNT; i++) {
  walls.push(new Wall(randomPos(WIDTH), randomPos(HEIGHT), randomPos(WIDTH), randomPos(HEIGHT)));
}

walls.push(new Wall(0, 0, WIDTH, 0));
walls.push(new Wall(0, 0, 0, HEIGHT));
walls.push(new Wall(WIDTH, HEIGHT, WIDTH, 0));
walls.push(new Wall(WIDTH, HEIGHT, 0, HEIGHT));

const light = new Light();

function draw() {
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    // Clear canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.strokeStyle = "rgb(250, 250, 250)";
    ctx.lineWidth = 2;

    // Show walls
    for (let wall of walls) {
      wall.show(ctx);
    }

    // Update light position and show
    light.update(mouseX, mouseY);
    light.show(ctx);
    light.cast(walls, ctx);

    window.requestAnimationFrame(draw);
  }
}

window.requestAnimationFrame(draw);

function randomPos(max) {
  return Math.floor(Math.random() * (max + 1));
}