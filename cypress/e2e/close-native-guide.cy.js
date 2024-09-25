describe("(Esc) Close Native Shortcut Guide Test", () => {
	it("should close the native shortcut guide", () => {
		cy.visit("/");
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms beofre handling descriptions
		cy.findAllByTestId("a11y_desc").eq(0).focus().type("?");
		cy.get(":focus").type("{esc}"); // Closing the guide by pressing the Esc
		cy.findAllByTestId("a11y-native-shortcut-guide").eq(0).should("not.be.visible"); // Check if the native shortcut guide is not visible (closed)
		cy.findAllByTestId("a11y_desc").eq(0).should("be.focused"); // Checks if the chart is focused
	});
});
