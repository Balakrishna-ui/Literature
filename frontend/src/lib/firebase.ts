// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYiWHMUEB4Eai4LT3PZ9E2o_lNDH7BJUs",
  authDomain: "literacture-3000d.firebaseapp.com",
  databaseURL: "https://literacture-3000d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "literacture-3000d",
  storageBucket: "literacture-3000d.firebasestorage.app",
  messagingSenderId: "601815643990",
  appId: "1:601815643990:web:974b9853f355e7961988f7",
  measurementId: "G-W4NRPESD6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics safely (it only runs in the browser, not during server-side rendering)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
