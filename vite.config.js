import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/server": {
				target: process.env.VITE_BACKEND_HOST,
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
