<template>
    <div :id="id" class="tabs-panel">
        <slot/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component({
        inheritAttrs: false
    })
    export default class FoundationTab extends Vue {
        @Prop({required: true}) public id?: string;
        @Prop({required: true}) public title?: string;

        public get href() {
            return `#${this.id}`;
        }

        public created() {
            this.$parent.$emit('register-tab', this);
        }

        public getTitleClass(active: boolean) {
            return active ? 'tabs-title is-active' : 'tabs-title';
        }
    }
</script>

<style scoped>

</style>
