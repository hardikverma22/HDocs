import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCG450wht-UO1kD7sU6NwvHZPkp8RLPtSg",
    authDomain: "docs-clone-fa7bd.firebaseapp.com",
    projectId: "docs-clone-fa7bd",
    storageBucket: "docs-clone-fa7bd.appspot.com",
    messagingSenderId: "325450283101",
    appId: "1:325450283101:web:3be7efac297b85563cf5b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
