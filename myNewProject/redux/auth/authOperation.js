import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";

import { Alert } from "react-native";

import { auth } from "../../firebase/config";

import {
    updateUserProfile,
    authStateChange,
    authSignOut,
    updateAvatar,
    authError,
} from "./authReducer";

export const authSignUpUser =
    ({ avatar, login, email, password }) =>
        async (dispatch) => {
            try {
                await createUserWithEmailAndPassword(auth, email, password);

                await updateProfile(auth.currentUser, {
                    displayName: login,
                    photoURL: avatar,
                });

                const { uid, displayName, photoURL } = auth.currentUser;
                const userEmail = auth.currentUser.email;

                dispatch(
                    updateUserProfile({
                        userId: uid,
                        login: displayName,
                        avatar: photoURL,
                        email: userEmail,
                    })
                );
            } catch (error) {
                dispatch(authError(error.message));
            }
        };

export const authSignInUser =
    ({ email, password }) =>
        async (dispatch) => {
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                dispatch(authError(error.message));
            }
        };

export const authSignOutUser = () => async (dispatch) => {
    try {
        await signOut(auth);
        dispatch(authSignOut());
    } catch (error) {
        dispatch(authError(error.message));
    }
};

export const authStateChangeUser = () => async (dispatch) => {
    await onAuthStateChanged(auth, (user) => {
        try {
            if (user) {
                const { uid, displayName, photoURL, email } = auth.currentUser;
                const userUpdateProfile = {
                    email,
                    avatar: photoURL,
                    login: displayName,
                    userId: uid,
                };

                dispatch(updateUserProfile(userUpdateProfile));
                dispatch(authStateChange({ stateChange: true }));
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    });
};

export const updateUserAvatar = (avatar) => async (dispatch) => {
    if (auth.currentUser) {
        try {
            await updateProfile(auth.currentUser, {
                photoURL: avatar,
            });

            const { photoURL } = auth.currentUser;

            dispatch(updateAvatar({ avatar: photoURL }));
        } catch (error) {
            dispatch(authError(error.message));
        }
    }
};
