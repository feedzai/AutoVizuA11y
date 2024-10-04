describe("(?) Open Native Shortcut Guide Test", () => {
	it("should open the native shortcut guide", () => {
		cy.visit("/");
		cy.injectAxe();
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms before handling descriptions
		cy.findAllByTestId("a11y-native-shortcut-guide")
			.first()
			.as("nativeGuide")
			.should("not.be.visible"); // Check if the native shortcut guide is not visible (closed)
		cy.findAllByTestId("a11y_desc").first().focus().type("?");
		cy.get("@nativeGuide").should("be.visible"); // Check if the native shortcut guide is visible (opened)
		cy.checkA11y();
	});
});
