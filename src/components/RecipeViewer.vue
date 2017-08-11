<template>
  <div>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
          <v-card-media :src="recipe.image" height="200px"></v-card-media>
          <v-card-title primary-title>
              <v-flex xs6>
                <h3 class="display-2 mb-0" style="padding-bottom: 10px">{{recipe.name}}</h3>
                <div>{{recipe.introduction}}</div>
              </v-flex>

              <v-flex xs6>
                <p align='right'>Prep Time: {{recipe.prepTime}}</p>
                <p align='right'>Cook Time: {{recipe.cookTime}}</p>
              </v-flex>
          </v-card-title>

          <v-card-text>
            <v-list two-line subheader>
              <v-layout row wrap>
                <v-flex xs6>
                  <h5>Ingredients</h5>
                  <v-list-tile v-for="ingredient in recipe.ingredients" @click.native='ingredient.checked = !ingredient.checked'>
                    <v-list-tile-action>
                      <v-checkbox v-on:click.stop.prevent="ingredient.checked = !ingredient.checked" color='primary' v-model="ingredient.checked"></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ingredient.name}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{ingredient.amount + ' ' + ingredient.units}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-flex>

                <v-flex xs6>
                  <h5>Instructions</h5>
                  <p>{{recipe.instructions}}</p>
                </v-flex>
              </v-layout>
            </v-list>
          </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
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
  };
</script>

<style>

</style>
