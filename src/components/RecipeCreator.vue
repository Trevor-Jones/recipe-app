<template>
  <div>
    <v-dialog v-model="cancelDialog" absolute persistent>
      <v-card>
        <v-card-title>
          <div class="headline">Confirm Cancellation</div>
        </v-card-title>
        <v-card-text>Are you sure you want to cancel and wipe all data you have already entered?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn primary flat @click.native="cancelDialog = false">No</v-btn>
          <v-btn primary flat @click.native="clear()">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-stepper v-model='e1'>
      <v-stepper-header>
        <v-stepper-step step="1" editable :complete="e1 > 1">Basic Information</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" editable :complete="e1 > 2">Ingredients and Instructions</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" editable>Review and Submit</v-stepper-step>
      </v-stepper-header>
      <v-stepper-content step="1">
        <v-text-field label="Name" v-model='recipe.name'></v-text-field>
        <v-text-field label="Description" v-model='recipe.quickDesc' hint='Short description of your recipe for displying on the card' counter max='200'></v-text-field>
        <v-text-field label="Introduction" v-model='recipe.introduction' hint='Introduction or description to your recipe' multi-line></v-text-field>
        <v-text-field label="Prep Time" v-model='recipe.prepTime' type='number' suffix='minutes'></v-text-field>
        <v-text-field label="Cook Time" v-model='recipe.cookTime' type='number' suffix='minutes'></v-text-field>
        <v-btn primary @click.native="e1 = 2">Continue</v-btn>
        <v-btn flat @click.native="cancelDialog = true">Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-text-field label="Instructions" v-model='recipe.instructions' hint='Instructions for your recipe' multi-line></v-text-field>
        <v-btn primary dark @click.native="ingredientDialog = true">Add Ingredient</v-btn>
        <v-layout row justify-center>
          <v-dialog v-model="ingredientDialog" persistent>
            <v-card>
              <v-card-title>
                <span class="headline">New Ingredient</span>
              </v-card-title>
              <v-card-text>
                <v-text-field label="Name" v-model='newIngredient.name' onkeydown="if (event.keyCode == 13)document.getElementById('saveIngredientBtn').click()"></v-text-field>
                <v-text-field label="Amount" v-model='newIngredient.amount' type='number' onkeydown="if (event.keyCode == 13)document.getElementById('saveIngredientBtn').click()"></v-text-field>
                <v-text-field label="Units" v-model='newIngredient.units' onkeydown="if (event.keyCode == 13)document.getElementById('saveIngredientBtn').click()"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="blue--text darken-1" flat @click.native="ingredientDialog = false">Close</v-btn>
                <v-btn class="blue--text darken-1" id='saveIngredientBtn' flat @click.native="saveIngredient()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
        <v-data-table v-bind:headers="headers" :items="recipe.ingredients" hide-actions class="elevation-1 mb-3" >
          <template slot="items" scope="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.amount }}</td>
            <td class="text-xs-right">{{ props.item.units }}</td>
          </template>
        </v-data-table>
        <v-btn primary @click.native="e1 = 3">Continue</v-btn>
        <v-btn flat @click.native="cancelDialog = true">Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-btn primary @click.native="pushToDB()">Submit</v-btn>
        <v-btn flat @click.native="cancelDialog = true">Cancel</v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
  import {FBApp} from './../modules/FirebaseDB';

  export default {
    name: 'recipe-creator',
    data () {
      return {
        e1: 0,
        cancelDialog: false,
        ingredientDialog: false,
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
        newIngredient: {
          name: '',
          amount: '',
          units: '',
          checked: false
        },
        headers: [
          { text: 'Ingredient', align: 'left', value: 'name' },
          { text: 'Amount', value: 'amount', align: 'right'},
          { text: 'Units', value: 'units', sortable: false, align: 'right' },
        ],
      }
    },
    methods: {
      clear() {
        this.cancelDialog = false;
        this.recipe = {
          introduction: '',
          quickDesc: '',
          instructions: '',
          name: '',
          prepTime: 0,
          cookTime: 0,
          image: '',
          ingredients: []
        };
      },
      saveIngredient() {
        this.ingredientDialog = false;
        this.recipe.ingredients.push(this.newIngredient);
        this.newIngredient = {
          name: '',
          amount: '',
          units: '',
          checked: false
        };
      },
      pushToDB() {
        const uid = FBApp.auth().currentUser.uid
        // Get a key for a new Post.
        var newPostKey = FBApp.database().ref().child('/users/' + uid + '/recipes/').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/users/' + uid + '/recipes/' + this.recipe.name.replace(/\s+/g, '-').toLowerCase() + newPostKey] = this.recipe;
        this.clear();
        return FBApp.database().ref().update(updates);
      }
    }
  };
</script>

<style>

</style>
