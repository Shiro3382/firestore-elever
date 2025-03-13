import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB-Gm0HEjl3CVkE2tbdmdqDihNOOEk4UdE",
    authDomain: "firestore-skole.firebaseapp.com",
    projectId: "firestore-skole",
    storageBucket: "firestore-skole.firebasestorage.app",
    messagingSenderId: "961214134972",
    appId: "1:961214134972:web:2c3ca1aa6e6994f6d8aeb9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);