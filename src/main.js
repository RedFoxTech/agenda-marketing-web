import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import PageLogin from './pages/PageLogin';
import PageRegister from './pages/PageRegister';
import PageCalendar from './pages/PageCalendar';

import {
  BootstrapVue,
  BootstrapVueIcons
} from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [{
    path: '/',
    component: PageLogin
  },
  {
    path: '/register',
    component: PageRegister
  },
  {
    path: '/calendar',
    component: PageCalendar
  }
];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');