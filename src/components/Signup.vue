<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="dialog">
        <v-btn primary slot="activator">Open Dialog</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text>
            <v-text-field label="Email" v-model="authInput.txtEmail"></v-text-field>
            <v-text-field label="Password" v-model="authInput.txtPassword" type="password"></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-btn primary dark v-on:click="Login()">
              Log in
            </v-btn>
            <v-btn primary dark v-on:click="SignUp()">
              Sign Up
            </v-btn>
            <v-btn id="btnLogout" error dark v-on:click="LogOut()" style="display:none">
              Log out
            </v-btn>
            <v-btn primary dark v-on:click="googleLogin()">
              Google in
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
    import {FBApp} from './../modules/FirebaseDB';
    import * as firebase from 'firebase';
    var provider = new firebase.auth.GoogleAuthProvider();

    export default {
        name: 'login',
        data() {
            return {
                authInput: {
                    txtEmail: '',
                    txtPassword: ''
                },
            }
        },
        methods: {
            Login: function(event) {
                const email = this.authInput.txtEmail;
                const pass = this.authInput.txtPassword;
                const auth = FBApp.auth();
                const promise = auth.signInWithEmailAndPassword(email, pass);
                this.authInput.txtEmail = '';
                this.authInput.txtPassword = '';
                promise.catch(event => console.log(event.message));
            },
            SignUp: function(event) {
                const email = this.authInput.txtEmail;
                const pass = this.authInput.txtPassword;
                const auth = FBApp.auth();
                const promise = auth.createUserWithEmailAndPassword(email, pass);
                this.authInput.txtEmail = '';
                this.authInput.txtPassword = '';
                promise.catch(event => console.log(event.message));
            },
            googleLogin: function() {
                FBApp.auth().signInWithPopup(provider).then(function(result) {
                    console.log(result);
                }).catch(function(error) {});
            },
            LogOut: function() {
                FBApp.auth().signOut();
            }
        }
    }
    FBApp.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log('logged in');
            document.getElementById('btnLogout').style.display = '';
            if (firebaseUser.emailVerified != true) {
                firebaseUser.sendEmailVerification().then(function() {
                    console.log('send Verification');
                }, function(error) {
                    console.log('not send Verification');
                });
            }
        } else {
            console.log('not logged in');
            document.getElementById('btnLogout').style.display = 'none';
        }
    })
</script>
