let flockie;

let alignSlider, cohesionSlider, separationSlider;
let restartB;
let amountSlider, perceptionRSlider, sizeSlider, maxForceSlider, maxSpeedSlider;

function setup() {
  let cnv = createCanvas(900,600)
  cnv.style('display', 'block');
  cnv.parent('sketch-holder');

  generateUI();

  restart();
}

function restart() {
  flockie = new flock(amountSlider.value(),
                      perceptionRSlider.value(),
                      sizeSlider.value());
}

function draw() {
  background(22,22,22);
  flockie.update();
  flockie.flock();
  flockie.show();
}

function generateUI() {
  amountSlider = crtSliderWithLabel(1, 300, 100, 1, 'boidsAmountSlider');
  amountSlider.changed(function() {
    restart();
  });
  perceptionRSlider = crtPropChangerSlider(1, 400, 80, 1, 'perceptionRSlider',
    function(boid, value) {
      boid.perceptionR = value;
  });
  sizeSlider = crtPropChangerSlider(1, 50, 10, 1, 'sizeSlider',
    function(boid, value) {
      boid.size = value;
      boid.widthPlusBoid = width + value;
      boid.heightPlusBoid = height + value;
  });
  maxForceSlider = crtPropChangerSlider(0, 5, 0.6, 1, 'maxForceSlider',
    function(boid, value) {
      boid.maxForce = value;
  });
  maxSpeedSlider = crtPropChangerSlider(0, 5, 4, 1, 'maxSpeedSlider',
    function(boid, value) {
      boid.maxSpeed = value;
  });

  alignSlider = crtSliderWithLabel(0, 3, 1, 0.05, 'alignment');
  cohesionSlider = crtSliderWithLabel(0, 3, 1, 0.05, 'cohesion');
  separationSlider = crtSliderWithLabel(0, 3, 1, 0.05, 'separation');
}

function crtPropChangerSlider(min, max, start, interval, parent, propChanger) {
  let slider = crtSliderWithLabel(min, max, start, interval, parent);
  slider.changed(function() {
    flockie.boids.forEach(function(boid) {
      propChanger(boid, slider.value());
    });
  });
  return slider;
}

function crtSliderWithLabel(min, max, start, interval, parent) {
  let container = createElement('div');
  container.parent(parent);

  let slider = createSlider(min, max, start, interval);
  slider.class('bg-dark');
  let label = createElement('h4', start);
  label.class('text-white text-center');
  slider.input(function() {
    label.html(slider.value());
  });
  slider.parent(container);
  label.parent(container);

  return slider;
}
