import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_kEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE__PROJECT_ID,
    storageBucket: import.meta.env.VITE__STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE__MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE__APP_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };