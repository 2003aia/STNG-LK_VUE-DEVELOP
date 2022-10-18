import Vue from 'vue';
import App from './app';
import router from './router';
import store from './store';
import VueCookie from 'vue-cookie';
import 'normalize.css';
import VueFilterCapitalize from '@/filters/capitalize';

Vue.config.productionTip = false;

Vue.use(VueCookie);

Vue.filter('capitalize', VueFilterCapitalize);

Vue.prototype.$screen = Vue.observable({
  width: window.innerWidth,
  height: window.innerHeight
});

window.addEventListener('resize', () => {
  Vue.prototype.$screen.width = window.innerWidth;
  Vue.prototype.$screen.height = window.innerHeight;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
