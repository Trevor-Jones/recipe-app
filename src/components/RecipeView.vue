<template>
  <div id="wrapper">
    <div class="row-div" v-for="recipeRows in chunkedData">
      <v-card v-for='recipe in recipeRows' class='recipe-card'>
        <v-card-media src="http://i.imgur.com/RRUe0Mo.png" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{recipe.name}}</h3>
            <div>{{recipe.three}}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat class="orange--text">Share</v-btn>
          <v-btn flat class="orange--text">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
  import {FBApp} from './../modules/FirebaseDB';
  var chunk = require('chunk');

  export default {
    name: 'recipe-view',
    data() {
      return {
        uid: '',
        recipes: [],
      }
    },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
    },
    created() {
      const self = this;

      FBApp.auth().onAuthStateChanged(function(user) {
        if (user) {
          this.uid = user.uid;

          var starCountRef = FBApp.database().ref('users/' + this.uid + '/recipes/');
          starCountRef.on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var recipe = {
                name: childSnapshot.key,
                three: childSnapshot.val().three
              }
              self.recipes.push(recipe);
            });
            console.log(self.recipes);
          });
        };
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
</style>
