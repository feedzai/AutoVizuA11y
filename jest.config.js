module.exports = {
	moduleNameMapper: {
		"\\.(css|less)$": "identity-obj-proxy",
	},
	testEnvironment: "jsdom",
	transformIgnorePatterns: ["node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"],
};
