import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCY0IpxNjl3UncHHN0WfcLyLY1JgYrh4Hs",
    authDomain: "tenedores-85894.firebaseapp.com",
    projectId: "tenedores-85894",
    storageBucket: "tenedores-85894.appspot.com",
    messagingSenderId: "245379607492",
    appId: "1:245379607492:web:df7aa47c70328902435291"
  
 
}

export const firebaseApp = firebase.initializeApp(firebaseConfig);