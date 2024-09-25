describe("(Esc) Close Custom Shortcut Guide Test", () => {
	it("should close the custom shortcut guide", () => {
		cy.visit("/");
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms beofre handling descriptions
		cy.findAllByTestId("a11y_desc").eq(0).focus().tab().type("?");
		cy.get(":focus").click(); // Closing the guide by pressing the button
		cy.findAllByTestId("a11y-custom-shortcut-guide").eq(0).should("not.be.visible"); // Check if the custom shortcut guide is not visible (closed)
		cy.findAllByTestId("a11y_desc").eq(1).should("be.focused"); // Checks if the chart is focused
	});
});
