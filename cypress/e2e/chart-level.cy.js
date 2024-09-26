describe("(Up Arrow) Moving to Chart Level Test", () => {
	it("should add back the tabindexes to the charts when moving from the data level", () => {
		cy.visit("/");
		cy.injectAxe();
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms before handling descriptions
		cy.findAllByTestId("a11y_desc").first().as("chartDescription").focus().type("{downArrow}");
		cy.findAllByTestId("a11y-chart-element")
			.first()
			.type("{upArrow}")
			.should("not.have.attr", "tabindex", "0"); // Checks if tabindex="0" does not exist
		cy.get("@chartDescription").should("have.attr", "tabindex", "0"); // Checks if tabindex="0" exists
		cy.checkA11y();
	});
});
