<template>
    <div :class="cssClass">
        <label>
            <span class="input-group-label">{{label}}</span>
            <input
                    class="input-group-field"
                    :value="value"
                    type="number"
                    v-bind="$attrs"
                    @input="$emit('input', $event.target.value)">
        </label>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component({inheritAttrs: false})
    export default class NumberInput extends Vue {
        @Prop({required: true}) public value?: number;

        @Prop({required: true}) public label?: string;
        @Prop({required: true}) public size?: string;

        public get cssClass(): string {
            return `${this.size} cell input-group`;
        }
    }
</script>

<style scoped>

</style>
