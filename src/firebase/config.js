import firebase from 'firebase/app' 
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration (would all be env vars for security purposes)
var firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.SENDER_ID,
    appId: process.env.APP_ID
};

firebase.initializeApp(firebaseConfig);

const firebaseStorage = firebase.storage();
const firebaseFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { firebaseStorage, firebaseFirestore, timestamp };