describe("(Up Arrow) Moving to Chart Level Test", () => {
	it("should add back the tabindexes to the charts when moving from the data level", () => {
		cy.visit("/");
		cy.get('[data-testid="manual-descriptions-option"]').click();
		cy.wait(500); // Wait for 0.5 seconds
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
