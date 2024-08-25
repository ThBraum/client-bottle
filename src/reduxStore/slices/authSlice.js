import { createSlice } from "@reduxjs/toolkit";
import { login as loginService, fetchCurrentUser } from "../../services/authService";

const initialState = {
	isAuthenticated: false,
	user: null,
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.isAuthenticated = true;
			state.user = {
				...action.payload.user,
				role: action.payload.user.role,
			};
			state.token = action.payload.token;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
		},
	},
});

export const { loginSuccess, logout } = authSlice.actions;

export const performLogin = (username, password) => async (dispatch) => {
	try {
		const data = await loginService(username, password);
		dispatch(loginSuccess({ token: data.access_token, user: data.user }));
	} catch (error) {
		console.error("Login failed:", error);
		throw error;
	}
};

export const loadCurrentUser = () => async (dispatch) => {
	try {
		const token = localStorage.getItem("access_token");
		if (token) {
			const user = await fetchCurrentUser();
			dispatch(loginSuccess({ token, user }));
		}
	} catch (error) {
		console.error("Failed to fetch user:", error);
		throw error;
	}
};

export default authSlice.reducer;
