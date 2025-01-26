// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1dK2CpdwAJrRAXuStHFVms0v9OH5VDwE",
  authDomain: "uol-desafio3.firebaseapp.com",
  projectId: "uol-desafio3",
  storageBucket: "uol-desafio3.firebasestorage.app",
  messagingSenderId: "109653208330",
  appId: "1:109653208330:web:2c97e85270fc5bcdce9ef3"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firebase Auth
const auth = getAuth(app);

// Configura o provedor Google
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword };
