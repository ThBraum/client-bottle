import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		theme: themeReducer,
	},
});

export default store;
