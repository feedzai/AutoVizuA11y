describe("template spec", () => {
	it("passes", () => {
		cy.visit("http://localhost:5173/AutoVizuA11y/");
		cy.get('[data-testid="manual-descriptions-option"]').click();
		cy.wait(500); // Wait for 0.5 second
		cy.get('[data-testid="a11y_desc"]')
			.eq(0)
			.should((chart) => {
				expect(chart).to.have.attr("aria-label"); // Checks if aria-label exists
				expect(chart).to.have.attr("tabindex", "0"); // Checks if tabindex="0" exists
			});
	});
});
