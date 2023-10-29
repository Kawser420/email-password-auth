// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVjeBsUEK_wVwk5MdvNwVZTiCtFjZNZ90",
  authDomain: "email-password-auth-8e70a.firebaseapp.com",
  projectId: "email-password-auth-8e70a",
  storageBucket: "email-password-auth-8e70a.appspot.com",
  messagingSenderId: "508103252574",
  appId: "1:508103252574:web:2e12741765153996d832cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;