import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCW_hBVbAfgHtR2BQRcpZ1nY9EbSus5Fro",
  authDomain: "challenge-platform-5f7d1.firebaseapp.com",
  projectId: "challenge-platform-5f7d1",
  storageBucket: "challenge-platform-5f7d1.firebasestorage.app",
  messagingSenderId: "124374953379",
  appId: "1:124374953379:web:4b8e24cbe6fee8b5c27e16"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export {auth, db, storage};