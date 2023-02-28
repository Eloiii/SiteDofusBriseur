// Import the functions you need from the SDKs you need

import {initializeApp} from "firebase/app";

import {getAnalytics} from "firebase/analytics";

import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBK9h6t-zg8fzlZgzBBJdCBhgD3QfLCu9E",

  authDomain: "dofusbrisage.firebaseapp.com",

  projectId: "dofusbrisage",

  storageBucket: "dofusbrisage.appspot.com",

  messagingSenderId: "522151926204",

  appId: "1:522151926204:web:4cf510d1ff87ea35d9b3b9",

  measurementId: "G-2SVZ9H7ZYX"

};

// Initialize Firebase

export const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp)

const analytics = getAnalytics(firebaseApp);
