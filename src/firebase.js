import firebase from 'firebase/app';// rollup bundle issue with ESM import
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyBroqsXrXmnt6YQJUOhQ1wTqOyFOdzSwLE",
  authDomain: "fir-auth-limit.firebaseapp.com",
  databaseURL: "https://fir-auth-limit.firebaseio.com",
  projectId: "fir-auth-limit",
  storageBucket: "fir-auth-limit.appspot.com",
  messagingSenderId: "600486792044",
  appId: "1:600486792044:web:e73918ebaa9d2066"
};

console.log(firebase)

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();


