import Point from "./Point.js";

class Ray {
  constructor(pos, angle) {
    this.pos = pos;
    this.angle = angle;
    this.dir = new Point(pos.x + 1 * Math.cos(Math.PI * angle / 180.0),
      pos.y + 1 * Math.sin(Math.PI * angle / 180.0));
  }

  updateDir() {
    this.dir.move(this.pos.x + 1 * Math.cos(Math.PI * this.angle / 180.0),
      this.pos.y + 1 * Math.sin(Math.PI * this.angle / 180.0));
  }

  show(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.strokeStyle = "rgba(250, 250, 250, 0.1)";
    this.updateDir();
    ctx.lineTo(this.dir.x, this.dir.y);
    ctx.stroke();
  }

  cast(wall) {
    const x1 = wall.point1.x;
    const y1 = wall.point1.y;
    const x2 = wall.point2.x;
    const y2 = wall.point2.y;
    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.dir.x;
    const y4 = this.dir.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den == 0) return;

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / den;

    if ((t > 0) && (t < 1) && (u > 0)) {
      const x = x1 + (t * (x2 - x1));
      const y = y1 + (t * (y2 - y1));

      return new Point(x, y);
    }
  }
}

export default Ray;