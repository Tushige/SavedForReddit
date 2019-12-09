import * as firebase from 'firebase/app';
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyAE_YXxVfvEGyX29ZWMovrs9Kdv2qpgxA8",
    authDomain: "savedforreddit.firebaseapp.com",
    databaseURL: "https://savedforreddit.firebaseio.com",
    projectId: "savedforreddit",
    storageBucket: "savedforreddit.appspot.com",
    messagingSenderId: "1057508435787",
    appId: "1:1057508435787:web:5e11658f971ef50a6b6ace",
    measurementId: "G-LXHDRXL4V1"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;