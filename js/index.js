import Wall from "./Wall.js";
import Light from "./Light.js";

// Constants
const WIDTH = 500;
const HEIGHT = 500;
const WALL_AMOUNT = 7;

const canvas = document.querySelector('#canvas');

let mouseX = 30;
let mouseY = 30;

// Mouse position event
onmousemove = e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

// Create walls
const walls = [];
for (let i = 0; i < WALL_AMOUNT; i++) {
  walls.push(new Wall(randomPos(WIDTH), randomPos(HEIGHT),
    randomPos(WIDTH), randomPos(HEIGHT),
    `${randomPos(200) + 50},${randomPos(200) + 50},${randomPos(200) + 50}`));
}
walls.push(new Wall(0, 0, WIDTH, 0, "200,0,0"));
walls.push(new Wall(0, 0, 0, HEIGHT, "1,200,0"));
walls.push(new Wall(WIDTH, HEIGHT, WIDTH, 0, "1,200,0"));
walls.push(new Wall(WIDTH, HEIGHT, 0, HEIGHT, "200,0,0"));

const light = new Light();

// KeyDown event
onkeydown = (e) => {
  e = e || window.event;
  switch (e.key) {
    case "ArrowLeft":
      light.moving.left = true;
      break;
    case "ArrowRight":
      light.moving.right = true;
      break;
    case "ArrowUp":
      light.moving.up = true;
      break;
    case "ArrowDown":
      light.moving.down = true;
      break;
  }
};
// KeyUp event
onkeyup = (e) => {
  e = e || window.event;
  switch (e.key) {
    case "ArrowLeft":
      light.moving.left = false;
      break;
    case "ArrowRight":
      light.moving.right = false;
      break;
    case "ArrowUp":
      light.moving.up = false;
      break;
    case "ArrowDown":
      light.moving.down = false;
      break;
  }
};

function draw() {
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    // Clear canvas
    ctx.clearRect(0, 0, 1000, HEIGHT);
    ctx.strokeStyle = "rgb(250, 250, 250)";
    ctx.lineWidth = 2;

    // Check for light movement
    light.checkMovement();

    // Show walls
    for (let wall of walls) {
      wall.show(ctx);
    }
    // Check for collisions with walls
    light.checkCollision(ctx);
    light.show(ctx);

    const heights = light.cast(walls, ctx);
    const wid = WIDTH / heights.length;

    for (let i = 0; i < heights.length; i++) {
      const clr = map(heights[i].height, 0, WIDTH, 1, 0);
      const h = map(HEIGHT / heights[i].height, 0, 20, 0, HEIGHT);
      const drawStart = -h / 2 + HEIGHT / 2;

      ctx.beginPath();

      ctx.fillStyle = `rgba(${heights[i].clr},${clr})`;
      ctx.fillRect(i * wid + WIDTH, drawStart, wid + 2, h);
      ctx.stroke();
    }

    window.requestAnimationFrame(draw);
  }
}

window.requestAnimationFrame(draw);

// Gives a random num between max and 0
function randomPos(max) {
  return Math.floor(Math.random() * (max + 1));
}
// Map a num from one range of values to another
function map(number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}