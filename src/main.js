// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import Notifications from 'vue-notification';
import 'vuetify/dist/vuetify.min.css';
import App from './App';
import router from './router';
import { FBApp } from './modules/FirebaseDB';
import './../static/font-awesome/css/font-awesome.min.css';

Vue.use(Vuetify);
Vue.use(Notifications);
Vue.config.productionTip = false;

const unsubscribe = FBApp.auth().onAuthStateChanged(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
  });

  unsubscribe();
});
