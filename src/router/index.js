import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '@/components/Homepage';
import RecipeListView from '@/components/RecipeListView';
import RecipeCreator from '@/components/RecipeCreator';
import RecipeViewer from '@/components/RecipeViewer';
import NoUserRecipeList from '@/components/NoUserRecipeList';
import {FBApp} from './../modules/FirebaseDB';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage,
    },
    {
      path: '/recipes/:uid',
      name: 'RecipeListView',
      component: RecipeListView,
      props: true
    },
    {
      path: '/creator',
      name: 'RecipeCreator',
      component: RecipeCreator,
    },
    {
      path: '/recipe/:uid/:recipeId',
      component: RecipeViewer,
      props: true
    },
    {
      path: '/recipes',
      component: NoUserRecipeList,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  if(to.name == 'RecipeCreator') {
    if(FBApp.auth().currentUser != null) {
      next()
    } else {
      console.log('wowowow');
      next( '/' );
    }
  }
  next();
})

export default router
