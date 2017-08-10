import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '@/components/Homepage';
import RecipeListView from '@/components/RecipeListView';
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
      name: 'RecipeListView',
      component: RecipeListView,
    },
    {
      path: '/creator',
      name: 'RecipeCreator',
      component: RecipeCreator,
    },
  ],
});
