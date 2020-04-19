<template>
    <div class="grid-container">
        <simulator/>
    </div>

</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';
    import Simulator from 'components/Simulator.vue';
    import * as $ from 'jquery';

    @Component({
        components: {Simulator}
    })
    export default class App extends Vue {
        public mounted() {
            $(() => $(document).foundation());
        }
    }
</script>

<style lang="scss">
    //@import "~foundation-sites/scss/settings";
    @import "~foundation-sites/scss/foundation";

    @include foundation-global-styles;
    @include foundation-forms;
    @include foundation-typography;

    @include foundation-flex-grid;

    // Generic components
    @include foundation-button;
    @include foundation-button-group;
    @include foundation-close-button;
    @include foundation-label;
    @include foundation-progress-bar;
    @include foundation-slider;
    @include foundation-switch;
    @include foundation-table;
    // Basic components
    @include foundation-badge;
    @include foundation-breadcrumbs;
    @include foundation-callout;
    @include foundation-card;
    @include foundation-dropdown;
    @include foundation-pagination;
    @include foundation-tooltip;

    // Containers
    @include foundation-accordion;
    @include foundation-media-object;
    @include foundation-orbit;
    @include foundation-responsive-embed;
    @include foundation-tabs;
    @include foundation-thumbnail;
    // Menu-based containers
    @include foundation-menu;
    @include foundation-menu-icon;
    @include foundation-accordion-menu;
    @include foundation-drilldown-menu;
    @include foundation-dropdown-menu;

    // Layout components
    @include foundation-off-canvas;
    @include foundation-reveal;
    @include foundation-sticky;
    @include foundation-title-bar;
    @include foundation-top-bar;

    // Helpers
    @include foundation-float-classes;
    @include foundation-flex-classes;
    @include foundation-visibility-classes;
    // @include foundation-prototype-classes;

    @include foundation-xy-grid-classes(
        /* options
        $base-grid: true,
        $margin-grid: true,
        $padding-grid: true,
        $block-grid: true,
        $collapse: true,
        $offset: true,
        $vertical-grid: true,
        $frame-grid: true
        */
    );
</style>
