describe("(Up Arrow) Moving to Chart Level Test", () => {
	it("should add back the tabindexes to the charts when moving from the data level", () => {
		cy.visit("/");
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms beofre handling descriptions
		cy.findAllByTestId("a11y_desc").eq(0).focus().type("{downArrow}");
		cy.findAllByTestId("a11y-chart-element")
			.eq(0)
			.type("{upArrow}")
			.should((chart) => {
				expect(chart).not.have.attr("tabindex", "0"); // Checks if tabindex="0" does not exist
			});
		cy.findAllByTestId("a11y_desc")
			.eq(0)
			.should((chart) => {
				expect(chart).have.attr("tabindex", "0"); // Checks if tabindex="0" exists
			});
	});
});
