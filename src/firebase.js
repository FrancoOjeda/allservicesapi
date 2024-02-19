// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");

const { getAuth } = require("firebase/auth");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVBgiPyUVhy_4OR2UKYZXhm8XAMbrtZZg",
  authDomain: "allserviceapp-api.firebaseapp.com",
  projectId: "allserviceapp-api",
  storageBucket: "allserviceapp-api.appspot.com",
  messagingSenderId: "1095014450046",
  appId: "1:1095014450046:web:3b8da22677407199c6692f",
  measurementId: "G-N6RRNQ9Q6Q"
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig);
const auth = getAuth(fireApp)
module.exports = { fireApp, auth }