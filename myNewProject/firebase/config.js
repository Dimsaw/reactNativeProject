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
    measurementId: "G-Y8HKZPSV9J",
};

export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
