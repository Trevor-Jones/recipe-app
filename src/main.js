// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify'
import Notifications from 'vue-notification'
import App from './App';
import router from './router';


Vue.use(Vuetify);
Vue.use(Notifications);
Vue.config.productionTip = false;

import 'vuetify/dist/vuetify.min.css';
import './../static/font-awesome/css/font-awesome.min.css';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
