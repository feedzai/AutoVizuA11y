describe("(Esc) Close Custom Shortcut Guide Test", () => {
	it("should close the custom shortcut guide", () => {
		cy.visit("/");
		cy.injectAxe();
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms before handling descriptions
		cy.findAllByTestId("a11y_desc").first().focus().tab().type("?");
		cy.get(":focus").click(); // Closing the guide by pressing the button
		cy.findAllByTestId("a11y-custom-shortcut-guide").first().should("not.be.visible"); // Check if the custom shortcut guide is not visible (closed)
		cy.findAllByTestId("a11y_desc").eq(1).should("be.focused"); // Checks if the chart is focused
		cy.checkA11y();
	});
});
