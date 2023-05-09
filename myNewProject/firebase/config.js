import { initializeApp } from "firebase/app";
import {
    initializeAuth,
    getReactNativePersistence,
} from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
    apiKey: "AIzaSyD-QFUrf7yGQU-4119LSmBxO4cePldBocc",
    authDomain: "my-social-project-f27c4.firebaseapp.com",
    projectId: "my-social-project-f27c4",
    storageBucket: "my-social-project-f27c4.appspot.com",
    messagingSenderId: "851544219607",
    appId: "1:851544219607:web:95727a66f0f1c6256c7592",
    measurementId: "G-TMPYPKQ9F1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const firestore = getFirestore(app);
export const storage = getStorage(app);

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase


// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { initializeApp } from "firebase/app";
// import {
//     initializeAuth,
//     getReactNativePersistence,
// } from "firebase/auth/react-native";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyD-QFUrf7yGQU-4119LSmBxO4cePldBocc",
//     authDomain: "my-social-project-f27c4.firebaseapp.com",
//     projectId: "my-social-project-f27c4",
//     storageBucket: "my-social-project-f27c4.appspot.com",
//     messagingSenderId: "851544219607",
//     appId: "1:851544219607:web:95727a66f0f1c6256c7592",
//     measurementId: "G-TMPYPKQ9F1"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // const auth = initializeAuth(app, {
// //     persistence: getReactNativePersistence(AsyncStorage),
// // });

// // export { auth };

// export const firestore = getFirestore(app);
