<template>
    <div class="slider" ref="slider">
        <span class="slider-handle" data-slider-handle role="slider" tabindex="1"></span>
        <span class="slider-fill" data-slider-fill></span>
        <input type="hidden" :value="value" ref="input">
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
    import * as $ from 'jquery';
    import 'foundation-sites';

    @Component({inheritAttrs: false})
    export default class FoundationSlider extends Vue {
        @Prop() public value?: number;

        @Prop({required: true}) public start!: number | string;
        @Prop({required: true}) public end!: number | string;
        @Prop({required: false, default: 1}) public step!: number | string;

        @Ref('slider') _slider!: HTMLElement;
        @Ref('input') _input!: HTMLInputElement;

        public mounted() {
            const coerceFloat = (value: number | string): number =>
                typeof value === 'string' ? parseFloat(value) : value;

            const self = this;
            this.$nextTick(() => {
                const $elem = $(this._slider);
                new Foundation.Slider($elem, {
                    start: coerceFloat(self.start),
                    end: coerceFloat(self.end),
                    step: coerceFloat(self.step),
                    initialStart: self.value
                });
                $elem.on('change changed.zf.slider',
                    () => this.$emit('input', this._input.value));
            });
        }
    }
</script>

<style scoped lang="scss">
    @import "~foundation-sites/scss/foundation";

    @include foundation-slider;
</style>
