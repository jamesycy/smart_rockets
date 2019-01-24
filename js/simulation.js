function Simulation() {
    this.popsize = createSlider(0, 500, POPSIZE, 10).parent("popsizeControl")
    this.mutation = createSlider(0.01, 10, MUTATION, 0.01).parent("mutationControl")

    this.lifespan = createSlider(300, 1000, LIFESPAN, 50).parent("lifespanControl")

    this.count = 0
    this.iterations = 0
    this.population = new Population()

    this.checkVariables = function () {
        POPSIZE = this.popsize.value();
        MUTATION = this.mutation.value();
        LIFESPAN = this.lifespan.value();
    }

    this.update = function () {
        select("#popsize").html(this.popsize.value())
        select("#mutation").html(this.mutation.value())
        select("#lifespan").html(this.lifespan.value())

        select("#count").html(this.count)
        select("#iteration").html(this.iterations)
        select("#successful").html(SUCCESSFUL)

        select("#avgFitness").html(AVERAGEFITNESS)
        select("#maxFitness").html(MAXIMUMFITNESS)
    }

    this.nextFrame = function () {
        this.population.moveRockets(this.count)

        if (this.count >= LIFESPAN) {
            this.population.evaluate();
            this.population.selection();

            SUCCESSFUL = 0

            this.count = -1
            this.iterations++

            this.checkVariables();
        }

        this.count++

    }

}