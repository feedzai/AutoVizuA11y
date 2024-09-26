describe("Addition of Attributes to Chart Elements Test", () => {
	it("should add aria-labels, aria-roledescription, empty role but not tabindexes to the chart elements", () => {
		cy.visit("/");
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms before handling descriptions
		cy.findAllByTestId("a11y-chart-element").first().as("chart-element");
		cy.get("@chart-element").should("have.attr", "aria-label"); // Check if aria-label exists
		cy.get("@chart-element").should("have.attr", "aria-roledescription"); // Check if aria-roledescription exists
		cy.get("@chart-element").should("have.attr", "role"); // Check if role exists
		cy.get("@chart-element").should("not.have.attr", "tabindex", "0"); // Check if tabindex="0" does not exist
	});
});
