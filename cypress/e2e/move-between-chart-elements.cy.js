describe("template spec", () => {
	it("passes", () => {
		cy.visit("http://localhost:5173/AutoVizuA11y/");
		cy.get('[data-testid="manual-descriptions-option"]').click();
		cy.wait(500); // Wait for 0.5 seconds
		cy.get('[data-testid="a11y_desc"]').eq(0).focus().type("{downArrow}");
		cy.get('[data-testid="a11y-chart-element"]').eq(0).type("{rightArrow}");
		cy.get('[data-testid="a11y-chart-element"]').eq(1).should("be.focused").type("{leftArrow}"); // Checks if the second element is focused
		cy.get('[data-testid="a11y-chart-element"]').eq(0).should("be.focused"); // Checks if the first element is focused
	});
});
