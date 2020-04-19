<template>
    <div class="slider" data-slider ref="slider">
        <span class="slider-handle" data-slider-handle role="slider" tabindex="1"></span>
        <span class="slider-fill" data-slider-fill></span>
        <input type="hidden" :value="value" ref="input">
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import * as $ from 'jquery';
    import 'foundation-sites';

    @Component({inheritAttrs: false})
    export default class FoundationSlider extends Vue {
        @Prop() public value?: number;

        @Prop() public start?: number | string;
        @Prop() public end?: number | string;
        @Prop() public step?: number | string;

        private _slider?: any;

        public mounted() {
            const coerceFloat = (value: number | string | undefined): number | undefined =>
                value === undefined ? undefined : typeof value === 'string' ? parseFloat(value) : value;

            const self = this;
            this.$nextTick(() => {
                const $elem = $(<HTMLElement>self.$refs.slider);
                self._slider = new Foundation.Slider($elem, {
                    start: coerceFloat(self.start),
                    end: coerceFloat(self.end),
                    step: coerceFloat(self.step),
                    initialStart: self.value,
                });
                $elem.on('change changed.zf.slider',
                    () => this.$emit('input', (<HTMLInputElement>this.$refs.input).value));
            });
        }
    }
</script>

<style scoped lang="scss">
    @import "~foundation-sites/scss/foundation";

    @include foundation-range-input;
</style>
