/// <reference types="vitest/globals" />
import { resolve } from "node:path";
import { defineConfig } from "vite";
import { InlineConfig } from "vitest";
import react from "@vitejs/plugin-react-swc";

const VITEST_CONFIG: InlineConfig = {
	globals: true,
	environment: "jsdom",
	include: ["./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
	setupFiles: "./setupVitest.ts",
};

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.js"),
			name: "AutoVizuA11y",
			formats: ["es", "umd"],
			fileName: (format) => {
				const OUTPUT: Partial<Record<typeof format, string>> = {
					es: "index.es.mjs",
					umd: "index.umd.cjs",
				};

				return OUTPUT[format] ?? "index.js";
			},
		},
		rollupOptions: {
			external: ["react", "react-dom", "react/jsx-runtime"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
					"react/jsx-runtime": "react/jsx-runtime",
				},
			},
		},
	},
	test: VITEST_CONFIG,
});
