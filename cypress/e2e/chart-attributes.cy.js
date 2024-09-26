describe("Addition of Attributes to Chart Test", () => {
	it("should add aria-labels and tabindexes to the charts", () => {
		cy.visit("/");
		cy.injectAxe();
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms before handling descriptions
		cy.findAllByTestId("a11y_desc")
			.first()
			.as("chartDescription")
			.should("have.attr", "aria-label"); // Check if aria-label exists
		cy.get("@chartDescription").should("have.attr", "tabindex", "0"); // Check if tabindex="0" exists
		cy.checkA11y();
	});
});
