var simulation;
var target;

function setup() {
    createCanvas(1200, 800).parent("canvas")

    target = createVector(width / 2, 50)

    simulation = new Simulation()
}

function draw() {
    background(100)

    noStroke()
    ellipse(target.x, target.y, 16, 16)

    simulation.update()

    simulation.nextFrame()
}