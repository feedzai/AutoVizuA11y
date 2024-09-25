import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		baseUrl: "http://localhost:5173/AutoVizuA11y/",
		experimentalRunAllSpecs: true,
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
