<template>
    <div>
        <canvas :height="height" ref="container" width="100%"></canvas>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Ref, Vue, Watch} from 'vue-property-decorator';
    import * as Chart from 'chart.js';
    import {ChartDataSets} from 'chart.js';

    @Component
    export default class LineChart extends Vue {
        @Prop({required: true}) data!: Array<number>;
        @Prop({required: true}) height!: string;

        private _chart: Chart | null = null;
        @Ref('container') _container!: HTMLCanvasElement;

        @Watch('data')
        public updateData(oldData: number[], newData: number[]) {
            if (this._chart == null) {
                return;
            }
            const datasets = <ChartDataSets[]>this._chart.data.datasets;
            datasets[0].data = this.data;
            this._chart.data.labels = this.chartDataLabels;
            this._chart.update();
        }

        private get $container() {
            return this._container;
        }

        private get chartDataLabels() {
            return this.data.map((value, index) => index);
        }

        public mounted() {
            (<HTMLCanvasElement>this.$el).style.height = this.height;
            this.$container.width = this.$container.getBoundingClientRect().width;

            const ctx = this.$container.getContext('2d');
            if (!ctx) {
                throw new Error('Failed to retrieve 2D canvas context');
            }

            this._chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.chartDataLabels,
                    datasets: [{
                        data: this.data,
                        borderColor: 'blue',
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        fill: false,
                        lineTension: 0
                    }]
                },
                options: {
                    responsive: true,
                    title: {
                        display: false
                    },
                    tooltips: {
                        mode: 'index'
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Generation'
                            },
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: this.data.length - 1
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Active Alleles'
                            },
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: 1,
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    }
</script>

<style scoped>
</style>
