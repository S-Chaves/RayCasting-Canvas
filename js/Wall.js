import Point from "./Point.js";

class Wall {
  constructor(x1, y1, x2, y2) {
    this.point1 = new Point(x1, y1);
    this.point2 = new Point(x2, y2);
  }

  show(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.point1.x, this.point1.y);
    ctx.lineTo(this.point2.x, this.point2.y);
    ctx.stroke();
  }
}

export default Wall;