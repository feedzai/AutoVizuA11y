describe("(Down Arrow) Moving to Data Level Test", () => {
	it("should add back the tabindexes to the chart elements when moving from the chart level", () => {
		cy.visit("/");
		cy.get('[data-testid="manual-descriptions-option"]').click();
		cy.wait(500); // Wait for 0.5 seconds
		cy.get('[data-testid="a11y_desc"]')
			.eq(0)
			.focus()
			.type("{downArrow}")
			.should((chart) => {
				expect(chart).not.have.attr("tabindex", "0"); // Checks if tabindex="0" does not exist
			});
		cy.get('[data-testid="a11y-chart-element"]')
			.eq(0)
			.should((chart) => {
				expect(chart).to.have.attr("tabindex", "0"); // Checks if tabindex="0" exists
			});
	});
});
