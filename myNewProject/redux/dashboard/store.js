// import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { authSlice } from '../auth/authReducer'

// const rootReducer = combineReducers({
//     [authSlice.name]: authSlice.reducer,
// })

// export const store = configureStore({
//     reducer: rootReducer
// })

import { configureStore } from "@reduxjs/toolkit";

// import { authReducer } from "../auth/authReducer";

export const store = configureStore({
    reducer: { [authSlice.name]: authSlice.reducer },
});