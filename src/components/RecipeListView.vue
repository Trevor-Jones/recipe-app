<template>
  <div id="wrapper">
    <div class="row-div" v-for="recipeRows in chunkedData">
      <v-card v-for='recipe in recipeRows' class='recipe-card'>
        <v-card-media :src="recipe.image" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{recipe.name}}</h3>
            <div>{{recipe.quickDesc}}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat primary>Share</v-btn>
          <router-link :to="createRecipeUrl(recipe.key)"><v-btn flat primary>View</v-btn></router-link>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
  import { FBApp } from './../modules/FirebaseDB';

  const chunk = require('chunk');

  export default {
    name: 'recipe-view',
    props: ['uid'],
    data() {
      return {
        recipes: [],
      };
    },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
      createRecipeUrl(recipeId) {
        return `/recipe/${this.uid}/${recipeId}`;
      },
    },
    created() {
      const self = this;
      const recipesRef = FBApp.database().ref(`users/${self.uid}/recipes/`);

      self.recipes = [];
      recipesRef.on('value', (snapshot) => {
        self.recipes = [];
        snapshot.forEach((childSnapshot) => {
          const recipe = {
            key: childSnapshot.key,
            introduction: childSnapshot.val().introduction,
            quickDesc: childSnapshot.val().quickDesc,
            instructions: childSnapshot.val().instructions,
            name: childSnapshot.val().name,
            prepTime: childSnapshot.val().prepTime,
            cookTime: childSnapshot.val().cookTime,
            image: childSnapshot.val().image,
            ingredients: childSnapshot.val().ingredients,
          };
          self.recipes.push(recipe);
        });
      }, () => {
        self.$notify({
          title: 'Auth Error',
          text: 'I\'m sorry but you don\'t have access to this data',
          type: 'error',
        });
      });
    },
    computed: {
      chunkedData() {
        return chunk(this.recipes, 3);
      },
    },
  };
</script>

<style scoped>
.recipe-card {
  width: 500px;
  margin-bottom: 20px;
  margin-left: 20px;
}

.row-div {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    padding: 10px;
    position: relative;
  }

  /* Remove underline from router-link */
  a {
    text-decoration: none;
  }
</style>
