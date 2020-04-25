<template>
    <div class="grid-container">
        <div class="top-bar">
            <h3 class="top-bar-title">boonetics</h3>
        </div>
        <foundation-tabs id="main-tabs" initial="simulator">
            <foundation-tab id="simulator" title="Simulator">
                <simulator/>
            </foundation-tab>
            <foundation-tab id="about" title="About">
                <h3>boonetics</h3>
                <h4>So... what is this?</h4>
                <p>
                    Basically just a playground for typescript, vue.js and other stuff.
                    &laquo;Boolean Genetics&raquo; is not a new term (hence this is called boonetics), but in this case
                    it's just some random concept meaning sort-of genetic recombination of bit strings.
                </p>
                <h4>How does it work?</h4>
                <p>
                    Basically, you start with two test subjects, A and B. They both share a configurable
                    &laquo;chromosome&raquo; type. A chromosome (in the sense of this nonsense) is just a string of
                    boolean variables with a fixed length, each position on such a string is called a &laquo;locus&raquo;,
                    the actual value at a specific locus is called an &laquo;allele&raquo; (so locus 7 might contain the
                    allele &laquo;true&raquo;).
                </p>
                <p>
                    The chromosomes' alleles are initialized with random bits, each one with some probability of being
                    &laquo;true&raquo;, which can be configured using the &laquo;Mean Active Allele for Subject A/B&raquo;
                    sliders.
                </p>
                <p>
                    While recombining the chromosomes, a Gauss-distributed random function is checked against the
                    &laquo;Likelihood to Select Genes from Fittest Parent&raquo; value; the name is misleading for the
                    first recombination, but for all other ones, you can increase the likelihood of the &laquo;better&raquo;
                    parent to contribute its alleles to their child by increasing that value above 50%.
                </p>
                <p>
                    While recombining, a certain chance exists for copy errors, i.e. that an allele was misread. You can
                    adjust the chances for that by using the &laquo;Mutation Probability&raquo; slider. If a mutation
                    happens, the chance for the misread allele to be &laquo;true&raquo; is configurable with
                    &laquo;Mean Active Mutated Alleles&raquo;.
                </p>
                <p>
                    Now it gets even dumber&hellip; Within each generation, 5 children are generated, and of these
                    children, the two fittest children become the new parents of the next generation. (&laquo;Fit&raquo;
                    is, in this scenario, equivalent to the number of &laquo;true&raquo; alleles in a chromosome.)
                </p>
                <h4>What scientific basis do you have?</h4>
                <p>
                    Good question&hellip; hm&hellip; uh&hellip; ah&hellip; look, there, a squirrel!
                    <small><i>*runs away*</i></small>
                </p>
            </foundation-tab>
        </foundation-tabs>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Simulator from 'components/Simulator.vue';
    import * as $ from 'jquery';
    import FoundationTabs from 'components/FoundationTabs.vue';
    import FoundationTab from 'components/FoundationTab.vue';

    @Component({
        components: {Simulator, FoundationTabs, FoundationTab}
    })
    export default class App extends Vue {
        public mounted() {
            $(() => $(document).foundation());
        }
    }
</script>

<style lang="scss">
    @import "settings";
    @import "~foundation-sites/scss/foundation";

    @include foundation-global-styles;
    @include foundation-forms;
    @include foundation-typography;
    @include foundation-xy-grid-classes;
    @include foundation-top-bar;
</style>
