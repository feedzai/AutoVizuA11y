describe("(Alt + W and Alt + Q) Jump to the Extremes of the Chart Test", () => {
	it("should set focus to the extreme elements of the chart", () => {
		cy.visit("http://localhost:5173/AutoVizuA11y/");
		cy.get('[data-testid="manual-descriptions-option"]').click();
		cy.wait(500); // Wait for 0.5 seconds
		cy.get('[data-testid="a11y_desc"]').eq(0).focus().type("{downArrow}");
		cy.get('[data-testid="a11y-chart-element"]').eq(0).type("{alt}w");
		cy.get('[data-testid="a11y-chart-element"]').eq(9).should("be.focused").type("{alt}q"); // Checks if the last element is focused
		cy.get('[data-testid="a11y-chart-element"]').eq(0).should("be.focused"); // Checks if the first element is focused
	});
});
