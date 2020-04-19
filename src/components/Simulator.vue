<template>
    <div class="grid-y grid-margin-x">
        <div class="cell grid-x grid-margin-x align-middle">
            <div class="cell medium-8">
                <foundation-slider v-model="lociCount" start="1" end="300"/>
            </div>
            <div class="cell medium-4">
                {{lociCount}} Loci
            </div>
        </div>
        <div class="cell grid-x grid-margin-x align-middle">
            <div class="cell medium-8">
                <foundation-slider v-model="meanA" start="0" end="100"/>
            </div>
            <div class="cell medium-4">
                {{meanA}}% Mean Active Allele for Subject A
            </div>
        </div>
        <div class="cell grid-x grid-margin-x align-middle">
            <div class="cell medium-8">
                <foundation-slider v-model="meanB" start="0" end="100"/>
            </div>
            <div class="cell medium-4">
                {{meanB}}% Mean Active Alleles for Subject B
            </div>
        </div>
        <div class="cell grid-x grid-margin-x align-middle">
            <div class="cell medium-8">
                <foundation-slider v-model="mutationProbability" start="0" end="100" step="0.1"/>
            </div>
            <div class="cell medium-4">
                {{mutationProbability}}% Mutation Probability
            </div>
        </div>
        <div class="cell grid-x grid-margin-x align-middle">
            <div class="cell medium-8">
                <foundation-slider v-model="meanMutation" start="0" end="100"/>
            </div>
            <div class="cell medium-4">
                {{meanMutation}}% Mean Active Mutated Alleles
            </div>
        </div>
        <div class="cell grid-x grid-margin-x align-middle">
            <div class="cell medium-8">
                <foundation-slider v-model="selectionBias" start="0" end="100"/>
            </div>
            <div class="cell medium-4">
                {{selectionBias}}% Likelihood to Select Genes from Fittest Parent
            </div>
        </div>
        <div class="cell grid-x grid-margin-x align-middle">
            <div class="cell medium-8">
                <foundation-slider v-model="generations" start="0" end="500"/>
            </div>
            <div class="cell medium-4">
                {{generations}} Generations
            </div>
        </div>
        <line-chart :data="getDatapoints()" height="400px"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Chromosome} from 'Chromosome';
    import NumberInput from 'components/NumberInput.vue';
    import FoundationSlider from 'components/FoundationSlider.vue';
    import LineChart from 'components/LineChart.vue';

    @Component({
        components: {LineChart, FoundationSlider, NumberInput}
    })
    export default class Simulator extends Vue {
        public lociCount: number = 150;
        public meanA: number = 45;
        public meanB: number = 15;
        public generations: number = 200;
        public mutationProbability: number = 3;
        public meanMutation: number = 50;
        public selectionBias: number = 50;

        getDatapoints(): number[] {
            let a = new Chromosome({mean: this.meanA / 100.0, lociCount: this.lociCount});
            let b = new Chromosome({mean: this.meanB / 100.0, lociCount: this.lociCount});

            const recombinationConfig = {
                mutationProbability: this.mutationProbability / 100.0,
                mean: this.meanMutation / 100.0,
                selectionBias: this.selectionBias / 100.0
            };

            const result = [];
            for (let i = 0; i < this.generations; ++i) {
                result.push(a.activeLociRatio);

                let children = [];
                for (let j = 0; j < 5; ++j) {
                    children.push(a.recombineWith(b, recombinationConfig));
                }
                children = children.sort((a, b) => b.activeLociCount - a.activeLociCount);
                a = children[0];
                b = children[1];
            }

            return result;
        }
    };
</script>

<style scoped>
</style>
