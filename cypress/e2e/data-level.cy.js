describe("(Down Arrow) Moving to Data Level Test", () => {
	it("should add back the tabindexes to the chart elements when moving from the chart level", () => {
		cy.visit("/");
		cy.injectAxe();
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms before handling descriptions
		cy.findAllByTestId("a11y_desc")
			.first()
			.focus()
			.type("{downArrow}")
			.should("not.have.attr", "tabindex", "0"); // Checks if tabindex="0" does not exist
		cy.findAllByTestId("a11y-chart-element").first().should("have.attr", "tabindex", "0"); // Checks if tabindex="0" exists
		cy.checkA11y();
	});
});
