describe("(?) Open Custom Shortcut Guide Test", () => {
	it("should open the custom shortcut guide", () => {
		cy.visit("/");
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms beofre handling descriptions
		cy.findAllByTestId("a11y-custom-shortcut-guide").eq(0).should("not.be.visible"); // Check if the custom shortcut guide is not visible (closed)
		cy.findAllByTestId("a11y_desc").eq(0).focus().tab().type("?");
		cy.findAllByTestId("a11y-custom-shortcut-guide").eq(0).should("be.visible"); // Check if the custom shortcut guide is visible (opened)
	});
});
