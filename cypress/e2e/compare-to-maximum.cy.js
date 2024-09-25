describe("(Alt + Shift + L) Compare to Maximum of the Chart Test", () => {
	it("should alert the correct comparison value between the first element and maximum of the chart", () => {
		cy.visit("/");
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms beofre handling descriptions
		cy.findAllByTestId("a11y_desc").eq(0).focus().type("{downArrow}");

		cy.findAllByTestId("a11y-chart-element").eq(0).type("{alt}{shift}l");

		cy.findAllByTestId("a11y-chart-alert")
			.eq(0)
			.should((chart) => {
				expect(chart).to.have.text("The value is the same as the maximum value"); // Checks if the comparison is alerted and correct
			});
	});
});
