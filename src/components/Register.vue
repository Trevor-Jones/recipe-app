<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent>
        <v-card>
          <v-card-title>
            <span class="headline">Register</span>

              <v-spacer></v-spacer>
            <v-btn fab flat small @click.native="dialog = false">
              X
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-text-field label="Email" v-model="authInput.txtEmail"></v-text-field>
            <v-text-field label="Password" v-model="authInput.txtPassword" type="password"></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="red white--text" v-on:click="googleLogin()">
              Google Login
            </v-btn>
            <v-btn primary dark v-on:click="Register()">
              Register
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
      name: 'register',
      props: {
        dialogProp: Boolean,
      },
      data() {
          return {
              dialog: false,
              authInput: {
                  txtEmail: '',
                  txtPassword: ''
              },
          }
      },
      watch: {
        // whenever question changes, this function will run
        dialogProp: function (newDialog) {
          this.dialog = this.dialogProp;
        },
        dialog: function (newDialog) {
          this.$parent.registerDialog = this.dialog;
        }
      },
      methods: {
          Register: function(event) {
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
      }
  }
  FBApp.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
          console.log('logged in');
          this.dialog = false;
          if (firebaseUser.emailVerified != true) {
              firebaseUser.sendEmailVerification().then(function() {
                  console.log('send Verification');
              }, function(error) {
                  console.log('not send Verification');
              });
          }
      } else {
          console.log('not logged in');
      }
  })
</script>
