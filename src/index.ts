import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// @ts-ignore
const v = new Vue({
  render: h => h(App)
}).$mount('#app');
