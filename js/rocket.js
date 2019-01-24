function Rocket(dna) {
    this.pos = createVector(width / 2, height / 2)
    this.acc = createVector()
    this.vel = createVector()

    this.dna = dna || new DNA()
    this.fitness = 0
    this.success = false
    this.dead = false
    this.eventAt = 0

    this.applyForce = function (force) {
        this.acc.add(force)
    }

    this.update = function (count) {
        if (!this.dead && !this.success) {
            this.applyForce(this.dna.genes[count])

            this.vel.add(this.acc)
            this.pos.add(this.vel)
            this.acc.mult(0)
        }
    }

    this.show = function () {
        push()
        noStroke()
        fill(255, 150)
        rectMode(CENTER)
        translate(this.pos.x, this.pos.y)
        rotate(this.vel.heading())
        rect(0, 0, 20, 6)
        pop()
    }

    this.checkPosition = function (count) {
        this.checkOutOfBounds(count)
        this.checkHitTarget(count)
    }

    this.checkOutOfBounds = function (count) {
        var x = this.pos.x
        var y = this.pos.y

        if (x < 0 || x > width) {
            this.dead = true
        }

        if (y < 0 || y > height) {
            this.dead = true
        }
    }

    this.checkHitTarget = function (count) {
        var x = this.pos.x
        var y = this.pos.y

        if (x >= target.x - 8 && x <= target.x + 8) {
            if (y >= target.y - 8 && y <= target.y + 8) {
                if (!this.success) {
                    SUCCESSFUL++
                    this.eventAt = count
                }
                this.pos.x = target.x
                this.pos.y = target.y
                this.success = true
            }
        }
    }

    this.calcFitness = function () {
        var d = dist(this.pos.x, this.pos.y, target.x, target.y)
        this.fitness = map(d, 0, width, width, 0)
        if (this.success) this.fitness = this.fitness * 2
        if (this.success) this.fitness += (this.eventAt * 2)
        if (this.dead) this.fitness = this.fitness / 2
    }

}