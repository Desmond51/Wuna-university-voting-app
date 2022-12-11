import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCaZ3HykojnO35zvofMhcm4EsAbwy8wfII",
	authDomain: "wuna-voting-system.firebaseapp.com",
	projectId: "wuna-voting-system",
	storageBucket: "wuna-voting-system.appspot.com",
	messagingSenderId: "212103053634",
	appId: "1:212103053634:web:aedd484527b4f45742c8db",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const storage = getStorage(app);
