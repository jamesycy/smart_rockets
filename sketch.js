var population;
var count = 0;
var lifespan = 500;
var target;
var lifeP;

function setup() {
  createCanvas(800, 500);
  population = new Population();
  target = createVector(width/2, 50)
  lifeP = createP();
}

function draw() {
  background(100);
  population.run();
  population.checkState();
  lifeP.html(count)
  count++;
  noStroke();
  ellipse(target.x, target.y, 16, 16);
  if(count == lifespan) {
    population.evaluate();
    population.selection();
    count = 0;
  }
}

function Population() {
  this.rockets = [];
  this.popsize = 100;
  this.selectionpool;

  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.run = function() {
    for (var i = 0; i < population.rockets.length; i++) {
      population.rockets[i].update();
      population.rockets[i].show();
    }
  }

  this.checkState = function() {
    for (var i = 0; i < population.rockets.length; i++) {
      if (population.rockets[i].pos.x >= target.x - 16 && population.rockets[i].pos.x <= target.x + 16) {
        if (population.rockets[i].pos.y <= target.y + 16 && population.rockets[i].pos.y >= target.y - 16) {
          population.rockets[i].pos.x = target.x;
          population.rockets[i].pos.y = target.y;
          population.rockets[i].success = true;
        }
      }

      if (population.rockets[i].pos.x > width || population.rockets[i].pos.x < 0 || population.rockets[i].pos.y < 0 || population.rockets[i].pos.y > height) {
        population.rockets[i].destroy = true;
      }

    }
  }

  this.evaluate = function() {
    var maxfit = 0;

    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }

    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
      if (this.rockets[i].success) this.rockets[i].fitness * 2
      if (this.rockets[i].destroy) this.rockets[i].fitness / 2
    }

    this.selectionpool = [];

    for (var i = 0; i < this.popsize; i++) {
      var n = this.rockets[i].fitness * 100;
      for (var j = 0; j < n; j++) {
        this.selectionpool.push(this.rockets[i]);
      }
    }

  }

  this.selection = function() {
    var newPopulation = [];

    for (var i = 0; i < this.rockets.length; i++) {
      var partnerA = random(this.selectionpool).dna;
      var partnerB = random(this.selectionpool).dna;
      var child = partnerA.crossover(partnerB);
      child.mutate();
      newPopulation[i] = new Rocket(child);
    }
    this.rockets = newPopulation;

  }

}

function DNA() {
  this.genes = [];
  this.mutation = 0.01;

  for (var i = 0; i < lifespan; i++) {
    this.genes[i] = p5.Vector.random2D()
    this.genes[i].setMag(0.2)
  }

  this.crossover = function (partner) {
    var child = new DNA();
    var mid = floor(random(this.genes.length));
    for (var i = 0; i < this.genes.length; i++) {
      if (i < mid) child.genes[i] = this.genes[i];
      else child.genes[i] = partner.genes[i];
    }

    return child;

  }

  this.mutate = function() {
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < this.mutate) {
        this.genes[i] = p5.Vector.random2D();
      }
    }
  }

}

function Rocket(dna) {
  this.vel = createVector();
  this.acc = createVector();
  this.pos = createVector(width/2, height - 10);
  this.fitness = 0;
  this.success = false;
  this.destroy = false;
  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }

  this.addForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    this.addForce(this.dna.genes[count]);

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.show = function() {
    push();
    noStroke();
    fill(255, 150);
    rectMode(CENTER)
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rect(0, 0, 20, 5);
    pop();
  }

  this.calcFitness = function() {
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = map(d, 0, width, width, 0);
  }

}
