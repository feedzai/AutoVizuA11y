describe("(?) Open Custom Shortcut Guide Test", () => {
	it("should open the custom shortcut guide", () => {
		cy.visit("/");
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms before handling descriptions
		cy.findAllByTestId("a11y-custom-shortcut-guide")
			.first()
			.as("customGuide")
			.should("not.be.visible"); // Check if the custom shortcut guide is not visible (closed)
		cy.findAllByTestId("a11y_desc").first().focus().tab().type("?");
		cy.get("@customGuide").should("be.visible"); // Check if the custom shortcut guide is visible (opened)
	});
});
