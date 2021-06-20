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

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const functions = firebase.functions();


// // eslint-disable-next-line no-restricted-globals
// if (process.env.FIRESTORE_EMULATOR === true) {
    // console.log('firestore emulator:', process.env.FIRESTORE_EMULATOR_HOST);
    // db.useEmulator('localhost', 8085);
    // auth.useEmulator('http://localhost:9099/', { disableWarnings: true });
    // functions.useEmulator('localhost', 5001);
// } else {
//     console.log(process.env.FIRESTORE_EMULATOR_HOST);
//     console.log('emulator not registered');
// }
export {db, auth, storage, functions}
export default firebase;
