import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';

let firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
        measurementId: process.env.REACT_APP_MEASUREMENT_ID
    };


firebase.initializeApp(firebaseConfig);

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

let db = firebase.firestore();
let auth = firebase.auth();
let storage = firebase.storage();
let functions = firebase.functions();

export const runningEmulator = false;

if (runningEmulator) {

    auth.useEmulator("http://localhost:9099");
    db.useEmulator('localhost', 8080);
    functions.useEmulator('localhost', 5001);
    console.log("Mooch using emulator");
}


export {db, auth, storage, functions}
export default firebase;
