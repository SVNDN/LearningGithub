class boid {
  constructor(percR, size, mForce, mSpeed) {
    // this.position = createVector(width/2, height/2);
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector();
    this.size = size;
    this.perceptionR = percR;
    this.maxForce = mForce;
    this.maxSpeed = mSpeed;

    this.widthPlusBoid = width + this.size;
    this.heightPlusBoid = height + this.size;
  }


  flock(boids) {
    let desiredAlignment = createVector();
    let desiredCohesion = createVector();
    let desiredSeparation = createVector();
    let total = 0;
    for (let other of boids) {
      if (other != this) {
        let otherPos = other.position.copy();
        otherPos = this.correctEdgeOverflowPerceptionR(otherPos);

        let d = p5.Vector.dist(this.position, otherPos);
        if (d < this.perceptionR) {
          desiredAlignment.add(other.velocity);
          desiredCohesion.add(otherPos);

          let difference = p5.Vector.sub(this.position, otherPos);
          difference.mult(1 / d);
          desiredSeparation.add(difference);
          total ++;
        }
      }
    }

    this.acceleration.mult(0);
    if (total > 0) {
      desiredAlignment.div(total);
      desiredCohesion.div(total);
      desiredCohesion.sub(this.position);

      desiredSeparation.div(total);

      desiredAlignment = this.createSteerV(desiredAlignment);
      desiredCohesion = this.createSteerV(desiredCohesion);
      desiredSeparation = this.createSteerV(desiredSeparation);

      desiredAlignment.mult(alignSlider.value());
      desiredCohesion.mult(cohesionSlider.value());
      desiredSeparation.mult(separationSlider.value());

      this.acceleration.add(desiredAlignment);
      this.acceleration.add(desiredCohesion);
      this.acceleration.add(desiredSeparation);
    }
  }

  createSteerV(desired) {
    desired.setMag(this.maxSpeed);
    desired.sub(this.velocity);
    desired.limit(this.maxForce);
    return desired;
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);

    this.checkEdge();
  }

  show() {
    strokeWeight(this.size);
    stroke(255);
    point(this.position.x, this.position.y);
  }

  correctEdgeOverflowPerceptionR(otherPos) {
    // if a boid is close to an edge, than a boid on the other side of the
    // screen could still be inside the perception radius
    // because boids will get teleported to the other side of the sceen when they fly out of the sceen

    if (this.position.x < this.perceptionR) {
      let edge = this.perceptionR - this.position.x;
      if (otherPos.x > width - edge)
      otherPos.x -= width;
    }
    else if (width - this.position.x < this.perceptionR) {
      let edge = this.perceptionR - (width - this.position.x);
      if (otherPos.x < edge)
      otherPos.x += width;
    }

    if (this.position.y < this.perceptionR) {
      let edge = this.perceptionR - this.position.y;
      if (otherPos.y > height - edge)
      otherPos.y -= height;
    }
    else if (height - this.position.y < this.perceptionR) {
      let edge = this.perceptionR - (height - this.position.y);
      if (otherPos.y < edge)
      otherPos.y += height;
    }
    return otherPos;
  }
  checkEdge() {
    if (this.position.x > this.widthPlusBoid)
      this.position.x = -this.size;
    else if (this.position.x < -this.size)
      this.position.x = this.widthPlusBoid;
      if (this.position.y > this.heightPlusBoid)
        this.position.y = -this.size;
      else if (this.position.y < -this.size)
        this.position.y = this.heightPlusBoid;
  }
}
