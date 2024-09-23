describe("template spec", () => {
	it("passes", () => {
		cy.visit("http://localhost:5173/AutoVizuA11y/");
		cy.get('[data-testid="manual-descriptions-option"]').click();
		cy.wait(500); // Wait for 0.5 second
		cy.get('[data-testid="a11y_desc"]').eq(0).focus().type("{downArrow}");
		cy.get('[data-testid="a11y-chart-element"]')
			.eq(0)
			.type("{upArrow}")
			.should((chart) => {
				expect(chart).not.have.attr("tabindex", "0"); // Checks if tabindex="0" does not exist
			});
		cy.get('[data-testid="a11y_desc"]')
			.eq(0)
			.should((chart) => {
				expect(chart).have.attr("tabindex", "0"); // Checks if tabindex="0" exists
			});
	});
});
