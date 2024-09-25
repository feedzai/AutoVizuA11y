describe("Addition of Attributes to Chart Elements Test", () => {
	it("should add aria-labels, aria-roledescription, empty role but not tabindexes to the chart elements", () => {
		cy.visit("/");
		cy.get('[data-testid="manual-descriptions-option"]').click();
		cy.wait(500); // AutoVizuA11y waits 500ms beofre handling descriptions
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
