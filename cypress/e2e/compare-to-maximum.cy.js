describe("(Alt + Shift + L) Compare to Maximum of the Chart Test", () => {
	it("should alert the correct comparison value between the first element and maximum of the chart", () => {
		cy.visit("/");
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms before handling descriptions
		cy.findAllByTestId("a11y_desc").first().focus().type("{downArrow}");
		cy.findAllByTestId("a11y-chart-element").first().type("{alt}{shift}l");
		cy.findAllByTestId("a11y-chart-alert")
			.first()
			.should("have.text", "The value is the same as the maximum value");
	});
});
