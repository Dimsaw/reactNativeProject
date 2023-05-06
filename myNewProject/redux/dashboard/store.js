import { authSlice } from "../auth/authSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: { [authSlice.name]: authSlice.reducer },
});

// import { configureStore, combineReducers } from '@reduxjs/toolkit';

// import { authReducer } from "../auth/authReducer";

// const rootReducer = combineReducers({
//     [authSlice.name]: authSlice.reducer,
// })

// export const store = configureStore({
//     reducer: rootReducer
// })
