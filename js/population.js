function Population() {
    this.rockets = [];
    this.selectionPool = [];

    for (var i = 0; i < POPSIZE; i++) {
        this.rockets[i] = new Rocket(null)
    }

    this.moveRockets = function (count) {
        for (var i = 0; i < this.rockets.length; i++) {
            this.rockets[i].update(count)
            this.rockets[i].show()
            this.rockets[i].checkPosition(count)
        }
    }

    this.evaluate = function () {
        // RESET REPORTING VALUES
        TOTALFITNESS = 0;
        AVERAGEFITNESS = 0;

        for (var i = 0; i < this.rockets.length; i++) {
            this.rockets[i].calcFitness();

            // FOR REPORTING VARIABLES
            TOTALFITNESS += this.rockets[i].fitness;
            AVERAGEFITNESS = TOTALFITNESS / this.rockets.length;
            if (this.rockets[i].fitness > MAXIMUMFITNESS) MAXIMUMFITNESS = this.rockets[i].fitness;
        }
    }

    this.selection = function () {
        var newPopulation = [];

        for (var i = 0; i < POPSIZE; i++) {
            var main = this.pickRandomRocket()
            var partner = this.pickRandomRocket()
            var newDNA = main.crossOver(partner)
            newDNA.mutate()
            newPopulation[i] = new Rocket(newDNA)
        }

        this.rockets = newPopulation;
    }

    this.pickRandomRocket = function () {
        var rnd = random(0, TOTALFITNESS);
        for (var i = 0; i < this.rockets.length; i++) {
            if (rnd <= this.rockets[i].fitness) {
                return this.rockets[i].dna
                break
            }
            rnd -= this.rockets[i].fitness
        }
    }

}