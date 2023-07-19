import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsY4MJTW8-5BT6oGo1emuwUSkZJr9jhn0",
  authDomain: "q-twitter-clone.firebaseapp.com",
  projectId: "q-twitter-clone",
  storageBucket: "q-twitter-clone.appspot.com",
  messagingSenderId: "809411425475",
  appId: "1:809411425475:web:6ae4a2950a0c8c94021e76"
};

const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
let db = getFirestore(app);

export default db;
