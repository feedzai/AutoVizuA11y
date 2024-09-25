describe("(?) Open Custom Shortcut Guide Test", () => {
	it("should open the custom shortcut guide", () => {
		cy.visit("/");
		cy.get('[data-testid="manual-descriptions-option"]').click();
		cy.wait(500); // Wait for 0.5 seconds
		cy.get('[data-testid="a11y-custom-shortcut-guide"]').eq(0).should("not.be.visible"); // Check if the custom shortcut guide is not visible (closed)
		cy.get('[data-testid="a11y_desc"]').eq(0).focus().tab().type("?");
		cy.get('[data-testid="a11y-custom-shortcut-guide"]').eq(0).should("be.visible"); // Check if the custom shortcut guide is visible (opened)
	});
});
