import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const COMMON_SERVER_PORT = 5173;

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: COMMON_SERVER_PORT,
	},
	preview: {
		port: COMMON_SERVER_PORT,
	},
	plugins: [react()],
	base: "/AutoVizuA11y/",
});
