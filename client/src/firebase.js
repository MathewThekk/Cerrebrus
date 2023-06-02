import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const config = {
  apiKey: "AIzaSyDUanFNG2Njfjz0qKP4Ltdzh9t8fwLY0ws",
  authDomain: "mindstair-b78b5.firebaseapp.com",
  projectId: "mindstair-b78b5",
  storageBucket: "mindstair-b78b5.appspot.com",
  messagingSenderId: "141373915008",
  appId: "1:141373915008:web:5692ddf14e6f544db20b65",
  measurementId: "G-0HEXKMVBGF"
};

// Initialize Firebase
const firebase = initializeApp(config);
const analytics = getAnalytics(firebase);

export default firebase;
