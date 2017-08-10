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
        <v-card class="grey lighten-1 z-depth-1 mb-5" height="200px"></v-card>
        <v-btn primary @click.native="e1 = 2">Continue</v-btn>
        <v-btn flat @click.native="cancelDialog = true">Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card class="grey lighten-1 z-depth-1 mb-5" height="200px"></v-card>
        <v-btn primary @click.native="e1 = 3">Continue</v-btn>
        <v-btn flat @click.native="cancelDialog = true">Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-card class="grey lighten-1 z-depth-1 mb-5" height="200px"></v-card>
        <v-btn primary>Submit</v-btn>
        <v-btn flat @click.native="cancelDialog = true">Cancel</v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>

  export default {
    name: 'recipe-creator',
    data () {
      return {
        e1: 0,
        cancelDialog: false,
        recipe: {
          description: '',
          instructions: '',
          name: '',
          time: 5,
          image: '',
          ingredients: []
        }
      }
    },
    methods: {
      clear() {
        this.cancelDialog = false;
        this.recipe = {
          description: '',
          instructions: '',
          name: '',
          time: 0,
          image: '',
          ingredients: []
        };
      }
    }
  };
</script>

<style>

</style>
