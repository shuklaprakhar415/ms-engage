import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBrZX5OXb0vOKQFvMd38hhA1K77MAeebq0",
    authDomain: "engage-project-28e8f.firebaseapp.com",
    projectId: "engage-project-28e8f",
    storageBucket: "engage-project-28e8f.appspot.com",
    messagingSenderId: "600749937251",
    appId: "1:600749937251:web:0e3361ac36cb23c0d95e56",
    measurementId: "G-TPLC7TD6XR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app