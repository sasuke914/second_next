// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration (find it in Firebase console)
const firebaseConfig = {
    apiKey: "AIzaSyBukx1G-zqd_3-c2hTmTCvHxv3YeupMXAc",
    authDomain: "bishdatabase.firebaseapp.com",
    projectId: "bishdatabase",
    storageBucket: "bishdatabase.appspot.com",
    messagingSenderId: "544792804887",
    appId: "1:544792804887:web:3ee6c1421cca246f0fa652",
    measurementId: "G-GDVHD2GBTD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
