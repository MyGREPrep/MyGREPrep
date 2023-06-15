import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxRhj_nyo_Ib3xo-BqYXhR-dI0jIwUQuo",
  authDomain: "myprep-gre.firebaseapp.com",
  projectId: "myprep-gre",
  storageBucket: "myprep-gre.appspot.com",
  messagingSenderId: "255276682236",
  appId: "1:255276682236:web:1fe0cc046ea5c896c50079",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
