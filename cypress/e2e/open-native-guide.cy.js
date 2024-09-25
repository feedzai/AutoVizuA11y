describe("(?) Open Native Shortcut Guide Test", () => {
	it("should open the native shortcut guide", () => {
		cy.visit("/");
		cy.get('[data-testid="manual-descriptions-option"]').click();
		cy.wait(500); // AutoVizuA11y waits 500ms beofre handling descriptions
		cy.get('[data-testid="a11y-native-shortcut-guide"]').eq(0).should("not.be.visible"); // Check if the native shortcut guide is not visible (closed)
		cy.get('[data-testid="a11y_desc"]').eq(0).focus().type("?");
		cy.get('[data-testid="a11y-native-shortcut-guide"]').eq(0).should("be.visible"); // Check if the native shortcut guide is visible (opened)
	});
});
