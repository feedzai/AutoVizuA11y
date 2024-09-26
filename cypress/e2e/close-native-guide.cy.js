describe("(Esc) Close Native Shortcut Guide Test", () => {
	it("should close the native shortcut guide", () => {
		cy.visit("/");
		cy.injectAxe();
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms before handling descriptions
		cy.findAllByTestId("a11y_desc").first().as("chartDescription").focus().type("?");
		cy.get(":focus").type("{esc}"); // Closing the guide by pressing the Esc
		cy.findAllByTestId("a11y-native-shortcut-guide").first().should("not.be.visible"); // Check if the native shortcut guide is not visible (closed)
		cy.get("@chartDescription").should("be.focused"); // Checks if the chart is focused
		cy.checkA11y();
	});
});
