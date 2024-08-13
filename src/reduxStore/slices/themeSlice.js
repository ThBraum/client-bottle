import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	mode: "dark",
};

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		toggleThemeMode: (state) => {
			state.mode = state.mode === "dark" ? "light" : "dark";
		},
	},
});

export const { toggleThemeMode } = themeSlice.actions;

export default themeSlice.reducer;
