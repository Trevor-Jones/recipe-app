<template>
  <div id="app" v-cloak>
    <notifications position='bottom right'/>
    <login :dialogProp='dialog'></login>
    <register :dialogProp='registerDialog'></register>
    <v-app id="example-3">
      <v-toolbar dark fixed class="primary" app>
        <v-toolbar-title class="white--text">Recipe App</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>refresh</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-toolbar>
      <v-navigation-drawer permanent fixed clipped light app>
        <v-list dense class="pt-0">
          <v-list-tile v-for="item in items" :key="item.title" router :href='item.path'>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile router  :href='recipesPath'>
            <v-list-tile-action>
              <v-icon>fa-list</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Recipes</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if='!noUserLoggedIn' router href='#/creator'>
            <v-list-tile-action>
              <v-icon>fa-plus</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Create Recipe</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if='noUserLoggedIn' @click.native= "dialog = true">
            <v-list-tile-action>
              <v-icon>fa-sign-in</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Login</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if='noUserLoggedIn' @click.native= "registerDialog = true">
            <v-list-tile-action>
              <v-icon>fa-user-plus</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Register</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if='!noUserLoggedIn' @click.native= "logOut()">
            <v-list-tile-action>
              <v-icon>fa-sign-out</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-content>
        <v-container fluid fill-height>
          <router-view></router-view>

            <v-footer class="pa-3" id='footer'>
              <v-spacer></v-spacer>
              <div>© Trevor Jones {{ new Date().getFullYear() }}</div>
            </v-footer>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
  import Login from './components/Login';
  import Register from './components/Register';
  import { FBApp } from './modules/FirebaseDB';

  export default {
    name: 'app',
    components: { Login, Register },
    data() {
      return {
        uid: '',
        dialog: false,
        registerDialog: false,
        noUserLoggedIn: false,
        drawer: null,
        items: [
          { title: 'Home', icon: 'dashboard', path: '#/' },
        ],
        right: null,
      };
    },
    methods: {
      logOut() {
        FBApp.auth().signOut();
      },
    },
    computed: {
      recipesPath() {
        if (this.uid === '') {
          return '#/recipes';
        }

        return `#/recipes/${this.uid}`;
      },
    },
    created() {
      FBApp.auth().onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
          this.uid = FBApp.auth().currentUser.uid;
          this.noUserLoggedIn = false;
          this.dialog = false;
          this.registerDialog = false;
          if (firebaseUser.emailVerified !== true) {
            firebaseUser.sendEmailVerification();
          }
        } else {
          this.uid = '';
          this.noUserLoggedIn = true;
        }
      });
    },
  };
</script>

<style>
  [v-cloak] {display: none}

  #footer {
   position:fixed;
   left:0px;
   bottom:0px;
   height:30px;
   width:100%;
}
</style>
