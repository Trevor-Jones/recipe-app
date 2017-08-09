import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '@/components/Homepage';
import Homepage0 from '@/components/Homepage0';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage,
    },
    {
      path: '/login',
      name: 'Homepage0',
      component: Homepage0,
    },
  ],
});
