import Point from "./Point.js";
import Ray from "./Ray.js";

const RAY_AMOUNT = 0.1;

class Light {
  constructor() {
    this.pos = new Point(50, 50);
    this.dir = 0;
    this.fov = 45;

    this.moving = {
      left: false,
      right: false,
      up: false,
      down: false
    };

    this.rays = [];
    for (let i = -(this.fov / 2); i < this.fov / 2; i += RAY_AMOUNT) {
      this.rays.push(new Ray(this.pos, i));
    }
  }

  // Checks if an arrow key was pressed
  checkMovement() {
    if (this.moving.left) this.rotate(-1);
    if (this.moving.right) this.rotate(1);
    if (this.moving.up) this.move(2);
    if (this.moving.down) this.move(-2);
  }
  // Rotates the light and rays by the given angle
  rotate(angle) {
    this.dir += angle;
    let index = 0;

    for (let a = -(this.fov / 2); a < this.fov / 2; a += RAY_AMOUNT) {
      this.rays[index].angle = a + this.dir;
      index++;
    }
  }
  // Moves the light
  move(dist) {
    this.pos.move(this.pos.x + dist * Math.cos(Math.PI * this.dir / 180.0),
      this.pos.y + dist * Math.sin(Math.PI * this.dir / 180.0));
  }
  // Checks where the rays intersect with walls
  cast(walls, ctx) {
    const heights = [];
    const pi = 3.14159265359;

    for (let ray of this.rays) {
      let closest = null;
      let record = Infinity;

      for (let wall of walls) {
        const point = ray.cast(wall);
        if (point) {
          let dist = Math.sqrt(
            Math.pow(ray.pos.x - point.x, 2) + Math.pow(ray.pos.y - point.y, 2)
          );
          const a = ray.angle - this.dir;
          dist *= Math.cos(a * (pi / 180));

          if (dist < record) {
            record = dist;
            closest = point;
          }
        }
      }

      if (closest) {
        ctx.beginPath();
        ctx.moveTo(ray.pos.x, ray.pos.y);
        ctx.lineTo(closest.x, closest.y);
        ctx.stroke();
      }
      heights.push(record);
    }

    return heights;
  }
  // Shows all the rays
  show(ctx) {
    for (let ray of this.rays) {
      ray.show(ctx);
    }
  }
}

export default Light;