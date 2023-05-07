import { authSlice } from "../auth/authSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: { [authSlice.name]: authSlice.reducer },
});

