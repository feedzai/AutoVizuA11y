import { defineConfig } from "cypress";
import codeCoverageTask from "@cypress/code-coverage/task";

export default defineConfig({
	e2e: {
		baseUrl: "http://localhost:5173/AutoVizuA11y/",
		experimentalRunAllSpecs: true,
		setupNodeEvents(on, config) {
			codeCoverageTask(on, config);
			return config;
		},
	},
});
