class flock {
  constructor(n, perceptionR = 80, size = 10, mForce = 0.6, mSpeed = 4) {
    this.boids = [];
    while (n-- > 0)
      this.boids.push(new boid(perceptionR, size, mForce, mSpeed));
  }

  flock() {
    let snapshot = this.boids;
    for (let boid of this.boids) {
      boid.flock(snapshot);
    }
  }

  update() {
    this.boids.forEach(function(boid) {
      boid.update();
    });
  }

  show() {
    this.boids.forEach(function(boid) {
      boid.show();
    });
  }

  clone() {

  }
}
