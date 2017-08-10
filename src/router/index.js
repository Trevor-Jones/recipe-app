import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '@/components/Homepage';
import RecipeView from '@/components/RecipeView';
import RecipeCreator from '@/components/RecipeCreator';

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
    {
      path: '/creator',
      name: 'RecipeCreator',
      component: RecipeCreator,
    },
  ],
});
