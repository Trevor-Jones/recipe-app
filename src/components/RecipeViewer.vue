<template>
  <div>
    <h2>{{this.recipe.name}}</h2>
    <v-list two-line subheader>
      <h5>Ingredients</h5>
      <v-layout row wrap>
        <v-flex xs6 v-for="ingredients in twoIngredientLists">
          <v-list-tile v-for="ingredient in ingredients" @click.native='ingredient.checked = !ingredient.checked'>
            <v-list-tile-action>
              <v-checkbox v-on:click.stop.prevent="ingredient.checked = !ingredient.checked" color='primary' v-model="ingredient.checked"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ingredient.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{ingredient.amount + ' ' + ingredient.units}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-flex>
      </v-layout>
    </v-list>
  </div>
</template>

<script>
  import {FBApp} from './../modules/FirebaseDB'

  export default {
    name: 'recipe-viewer',
    props: ['uid', 'recipeId'],
    data () {
      return {
        recipe: {
          introduction: '',
          quickDesc: '',
          instructions: '',
          name: '',
          prepTime: 0,
          cookTime: 0,
          image: '',
          ingredients: [],
        },
      }
    },
    created () {
      const self = this;
      return FBApp.database().ref('/users/' + self.uid + '/recipes/' + self.recipeId).once('value').then(function(snapshot) {
        console.log('reading data');
        self.recipe = snapshot.val()
      });
    },
    computed: {
      twoIngredientLists() {
        var lists = [[],[]];
        var listNum = 0;
        this.recipe.ingredients.forEach(function(ingredient) {
          lists[listNum].push(ingredient);
          if(listNum == 0) {
            listNum = 1;
          } else {
            listNum = 0;
          }
        });
        return lists
      }
    }
  };
</script>

<style>

</style>
