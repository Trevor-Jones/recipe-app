<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent>
        <v-card>
          <v-card-title>
            <span class="headline">Login</span>

              <v-spacer></v-spacer>
            <v-btn fab flat small @click.native="dialog = false">
              X
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-text-field label="Email" v-model="authInput.txtEmail" onkeydown = "if (event.keyCode == 13)document.getElementById('loginBtn').click()"></v-text-field>
            <v-text-field label="Password" v-model="authInput.txtPassword" type="password" onkeydown = "if (event.keyCode == 13)document.getElementById('loginBtn').click()"></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="red white--text" v-on:click="googleLogin()">
              Google Login
            </v-btn>
            <v-btn id='loginBtn' primary dark v-on:click="login()">
              Log in
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
  import * as firebase from 'firebase';
  import { FBApp } from './../modules/FirebaseDB';

  const provider = new firebase.auth.GoogleAuthProvider();

  export default {
    name: 'login',
    props: {
      dialogProp: Boolean,
    },
    data() {
      return {
        dialog: false,
        authInput: {
          txtEmail: '',
          txtPassword: '',
        },
      };
    },
    watch: {
      // whenever question changes, this function will run
      dialogProp() {
        this.dialog = this.dialogProp;
      },
      dialog() {
        this.$parent.dialog = this.dialog;
      },
    },
    methods: {
      login() {
        const self = this;
        const email = this.authInput.txtEmail;
        const pass = this.authInput.txtPassword;
        const auth = FBApp.auth();
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.then(() => {
          self.authInput.txtEmail = '';
          self.authInput.txtPassword = '';
        }, (event) => {
          self.$notify({
            title: 'Login Error',
            text: event.message,
            type: 'error',
          });
          self.authInput.txtPassword = '';
        });
      },
      googleLogin() {
        FBApp.auth().signInWithPopup(provider);
      },
    },
  };
</script>
