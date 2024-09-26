describe("(Alt + Z) Compare to Rest of the Chart Test", () => {
	it("should alert the correct comparison value between the first element and rest of the chart", () => {
		cy.visit("/");
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms before handling descriptions
		cy.findAllByTestId("a11y_desc").first().as("chartDescription").focus().type("{alt}z");
		cy.findAllByTestId("a11y-chart-alert")
			.first()
			.as("chartAlert")
			.should("have.text", "This shortcut only works inside a chart");
		cy.get("@chartDescription").type("{downArrow}");
		cy.findAllByTestId("a11y-chart-element").first().type("{alt}z");
		cy.get("@chartAlert").should("have.text", "This is the highest value.");
	});
});
