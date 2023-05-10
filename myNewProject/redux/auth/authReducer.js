import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    login: null,
    email: null,
    stateChange: false,
    error: null,
    // avatar: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {

        updateUserProfile: (state, { payload }) => ({
            ...state,
            userId: payload.userId,
            login: payload.login,
            // avatar: payload.avatar,
            email: payload.email,
            error: null,
        }),
        authStateChange: (state, { payload }) => ({
            ...state,
            stateChange: payload.stateChange,
            error: null,
        }),

        authSignOut: () => initialState,

        updateAvatar: (state, { payload }) => ({
            ...state,
            avatar: payload.avatar,
            error: null,
        }),

        authError: (state, { payload }) => ({
            ...state,
            error: payload,
        }),

    },
});

export const {
    updateUserProfile,
    authStateChange,
    authSignOut,
    updateAvatar,
    authError,
} = authSlice.actions;