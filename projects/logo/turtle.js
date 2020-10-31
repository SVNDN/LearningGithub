class Turtle {
  constructor(x,y) {
    this.pos = createVector(x,y);
    this.dir = createVector(0,1);
    this.pen = true;
  }
  move(a) {
    var old = this.pos.copy();
    this.pos.add(a*this.dir.x,a*this.dir.y);
    if (this.pen) {
      stroke(255);
      strokeWeight(2);
      line(old.x, old.y, this.pos.x, this.pos.y);
    }
  }
  rotate(angle) {
    this.dir.rotate(radians(angle));
  }
  home() {
    var center = createVector(0, 0);
    if (this.pen)
      line(this.pos.x, this.pos.y, center.x, center.y);
    this.pos = center;
  }
  goto(x,y) {
    if (this.pen)
      line(this.pos.x, this.pos.y, x, y);
    this.pos = createVector(x,y);
  }
}
