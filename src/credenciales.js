// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAd_PNAuoPsM2N-y9mAGWH9PZeRBwZL1o",
  authDomain: "backmarketuv-15535.firebaseapp.com",
  databaseURL: "https://backmarketuv-15535-default-rtdb.firebaseio.com",
  projectId: "backmarketuv-15535",
  storageBucket: "backmarketuv-15535.appspot.com",
  messagingSenderId: "562895820150",
  appId: "1:562895820150:web:c508cb0283a3c1a8171657",
  measurementId: "G-W48JTPT05G"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;
