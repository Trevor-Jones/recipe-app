var firebase = require('firebase');
const config = {
  apiKey: "AIzaSyAQaDzgt4S5J5GYDR9uLyvCmc4rkDO50Rs",
  authDomain: "recipe-app-a6f04.firebaseapp.com",
  databaseURL: "https://recipe-app-a6f04.firebaseio.com",
  projectId: "recipe-app-a6f04",
  storageBucket: "recipe-app-a6f04.appspot.com",
  messagingSenderId: "155665686625"
};
var FbApp = firebase.initializeApp(config);

module.exports.FBApp = FbApp;
