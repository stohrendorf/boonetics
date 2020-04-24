<template>
    <div>
        <ul :id="id" class="tabs" data-tabs>
            <li :class="tab.getTitleClass(tab.id === initial)" :data-tab-id="tab.id" v-for="tab of tabs">
                <a :href="tab.href">{{ tab.title }}</a>
            </li>
        </ul>
        <div :data-tabs-content="id" class="tabs-content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import FoundationTab from 'components/FoundationTab.vue';
    import * as $ from 'jquery';

    @Component({
        inheritAttrs: false
    })
    export default class FoundationTabs extends Vue {
        @Prop({required: true}) public id?: string;
        @Prop({required: false}) public initial?: string;

        private _tabs: FoundationTab[] = [];

        public get tabs() {
            return this._tabs;
        }

        public created() {
            this._tabs = [];
            this.$root.$children[0].$children.forEach(child =>
                child.$on('register-tab', this.registerTab));
        }

        public mounted() {
            this.$forceUpdate();

            $(this.$el).children('div.tabs-content').children('div.tabs-panel')
                       .removeClass('is-active');
            $(this.$el).children('div.tabs-content').children('div.tabs-panel')
                       .filter((idx, el) => (<HTMLDivElement>el).id === this.initial)
                       .addClass('is-active');
            $(this.$el).children('ul.tabs li.tabs-title')
                       .removeClass('is-active');
            $(this.$el).children('ul.tabs li.tabs-title')
                       .filter((idx, el) => $(el).data('data-tab-id') === this.initial)
                       .addClass('is-active');
        }

        private registerTab(tab: FoundationTab) {
            this._tabs.push(tab);
        }
    }
</script>

<style scoped>

</style>
