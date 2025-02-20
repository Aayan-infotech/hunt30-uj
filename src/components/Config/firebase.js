import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyDHJUm-WtYqA8LbVjIBjubi_tmOw3sTun0",
    authDomain: "taxidermy-a2431.firebaseapp.com",
    databaseURL: "httpss://taxidermy-a2431-default-rtdb.firebaseio.com",
    projectId: "taxidermy-a2431",
    storageBucket: "taxidermy-a2431.appspot.com",
    messagingSenderId: "772967566761",
    appId: "1:772967566761:web:92417d8db9b65293a108b8",
    measurementId: "G-0Y1SQG5Y1Y"
  };

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
export { database };