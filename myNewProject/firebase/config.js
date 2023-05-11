import { initializeApp } from "firebase/app";
import {
    initializeAuth,
    getReactNativePersistence,
} from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
    apiKey: "AIzaSyBl9T63MHcqBOxt179SqbwTPjbXouE18zo",
    authDomain: "mobilesocialnetwork-891d9.firebaseapp.com",
    projectId: "mobilesocialnetwork-891d9",
    storageBucket: "mobilesocialnetwork-891d9.appspot.com",
    messagingSenderId: "317662603221",
    appId: "1:317662603221:web:eca9f40b2fe93b932aff5c",
    measurementId: "G-Y8HKZPSV9J"
};


export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);












// const firebaseConfig = {
//     apiKey: "AIzaSyD-QFUrf7yGQU-4119LSmBxO4cePldBocc",
//     authDomain: "my-social-project-f27c4.firebaseapp.com",
//     projectId: "my-social-project-f27c4",
//     storageBucket: "my-social-project-f27c4.appspot.com",
//     messagingSenderId: "851544219607",
//     appId: "1:851544219607:web:95727a66f0f1c6256c7592",
//     measurementId: "G-TMPYPKQ9F1"
// };

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyC9KIZQEJJYxenRnzcdcHxaRd93F-LMgIs",
//     authDomain: "socialnetwork-19d0b.firebaseapp.com",
//     projectId: "socialnetwork-19d0b",
//     storageBucket: "socialnetwork-19d0b.appspot.com",
//     messagingSenderId: "750515456509",
//     appId: "1:750515456509:web:1599e9865e9600f2ab7194",
//     measurementId: "G-KPL0C44B46"
// };

//////new
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional



// const firebaseConfig = {
//     apiKey: 'AIzaSyAE4XAQAOB_VhxnUl0NX_U_J5fGpwVgxOo',
//     authDomain: 'rn-social-8de82.firebaseapp.com',
//     projectId: 'rn-social-8de82',
//     storageBucket: 'rn-social-8de82.appspot.com',
//     messagingSenderId: '1059536892757',
//     appId: '1:1059536892757:web:34e7e690683dcc959075dc',
// };


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase


// Initialize Firebase
