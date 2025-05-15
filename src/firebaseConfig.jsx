// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiUStlsisdp3t7fAqs3QVfmbZUWSIECA8",
  authDomain: "e-commerce-ca697.firebaseapp.com",
  projectId: "e-commerce-ca697",
  storageBucket: "e-commerce-ca697.firebasestorage.app",
  messagingSenderId: "439332184556",
  appId: "1:439332184556:web:114e376bcc4a8a7e06e0c9",
  measurementId: "G-7B7ZMVL07X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;