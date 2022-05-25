// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrZX5OXb0vOKQFvMd38hhA1K77MAeebq0",
  authDomain: "engage-project-28e8f.firebaseapp.com",
  projectId: "engage-project-28e8f",
  storageBucket: "engage-project-28e8f.appspot.com",
  messagingSenderId: "600749937251",
  appId: "1:600749937251:web:0e3361ac36cb23c0d95e56",
  measurementId: "G-TPLC7TD6XR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;