describe("template spec", () => {
	it("passes", () => {
		cy.visit("http://localhost:5173/AutoVizuA11y/");
		cy.get('[data-testid="manual-descriptions-option"]').click();
		cy.wait(500); // Wait for 0.5 second
		cy.get('[data-testid="a11y-chart-element"]')
			.eq(0)
			.should((chart) => {
				expect(chart).to.have.attr("aria-label"); // Checks if aria-label exists
				expect(chart).to.have.attr("aria-roledescription"); // Checks if aria-roledescription exists
				expect(chart).to.have.attr("role"); // Checks if role exists
				expect(chart).not.have.attr("tabindex", "0"); // Checks if tabindex="0" does not exist
			});
	});
});
