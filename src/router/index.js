import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '@/components/Homepage';
import RecipeView from '@/components/RecipeView';

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
      path: '/recipes',
      name: 'RecipeView',
      component: RecipeView,
    },
  ],
});
