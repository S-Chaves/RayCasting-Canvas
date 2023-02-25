import Point from "./Point.js";
import Ray from "./Ray.js";

const RAY_AMOUNT = 1;

class Light {
  constructor() {
    this.pos = new Point(100, 100);
    this.rays = [];
    for (let i = 0; i < 360; i += RAY_AMOUNT) {
      this.rays.push(new Ray(this.pos, i));
    }
  }

  update(x, y) {
    this.pos.move(x, y);
  }

  cast(walls, ctx) {
    for (let ray of this.rays) {
      let closest = null;
      let record = Infinity;

      for (let wall of walls) {
        const point = ray.cast(wall);
        if (point) {
          const dist = Math.sqrt(
            Math.pow(ray.pos.x - point.x, 2) + Math.pow(ray.pos.y - point.y, 2)
          );

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
    }
  }

  show(ctx) {
    for (let ray of this.rays) {
      ray.show(ctx);
    }
  }
}

export default Light;