function DNA() {
    this.genes = [];

    for (var i = 0; i < LIFESPAN; i++) {
        this.genes[i] = p5.Vector.random2D().setMag(0.2)
    }

    this.crossOver = function (partner) {
        var nextGen = new DNA();
        for (var i = 0; i < nextGen.genes.length; i++) {
            var inheritFrom = Math.floor(random(0, 1))
            if (inheritFrom == 0) {
                // Inherit Genes from main
                nextGen.genes[i] = this.genes[i] || p5.Vector.random2D().setMag(0.2)
            } else {
                // Inherit Genes from partner
                nextGen.genes[i] = partner.genes[i] || p5.Vector.random2D().setMag(0.2)
            }
        }
        return nextGen;
    }

    this.mutate = function () {
        for (var i = 0; i < this.genes.length; i++) {
            var rnd = random(0, 100)
            if (rnd < MUTATION) {
                this.genes[i] = p5.Vector.random2D().setMag(0.2)
            }
        }
    }

}