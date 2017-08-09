<template>
  <div id="app" v-cloak>
    <notifications position='bottom right'/>
    <login :dialogProp='dialog'></login>
    <register :dialogProp='registerDialog'></register>
    <v-app id="example-3" standalone>
      <v-navigation-drawer permanent clipped light >
        <v-list dense class="pt-0">
          <v-list-tile v-for="item in items" :key="item.title" router exact :href='item.path'>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
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

          <v-list-tile v-if='!noUserLoggedIn' @click.native= "LogOut()">
            <v-list-tile-action>
              <v-icon>fa-sign-out</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar dark fixed class="primary">
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
      <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
import Login from './components/Login';
import Register from './components/Register';
import {FBApp} from './modules/FirebaseDB';

export default {
  name: 'app',
  components: { Login, Register },
  data () {
    return {
      dialog: false,
      registerDialog: false,
      noUserLoggedIn: false,
      drawer: null,
      items: [
        { title: 'Home', icon: 'dashboard', path: '/' },
        { title: 'About', icon: 'question_answer', path: '/login' }
      ],
      right: null
    }
  },
  methods: {
    LogOut: function() {
        FBApp.auth().signOut();
    }
  },
  created() {
    FBApp.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            this.noUserLoggedIn = false;
            this.dialog = false;
            this.registerDialog = false;
            console.log('logged in');
            if (firebaseUser.emailVerified != true) {
                firebaseUser.sendEmailVerification().then(function() {
                    console.log('send Verification');
                }, function(error) {
                    console.log('not send Verification');
                });
            }
        } else {
            this.noUserLoggedIn = true;
            console.log('not logged in');
        }
    })
  }
}
</script>

<style>
  [v-cloak] {display: none}
</style>
