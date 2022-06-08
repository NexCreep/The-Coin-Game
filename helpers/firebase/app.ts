import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
 
const firebaseConfig = {
  apiKey: "AIzaSyCnQpmpgNsStlIPNgGvoh6-iHCDZScQBkw",
  authDomain: "example-firebase-a7e06.firebaseapp.com",
  databaseURL: "https://example-firebase-a7e06-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "example-firebase-a7e06",
  storageBucket: "example-firebase-a7e06.appspot.com",
  messagingSenderId: "783760371271",
  appId: "1:783760371271:web:94578e8b51aaf09f528b62",
  measurementId: "G-TYETCCNPSL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;