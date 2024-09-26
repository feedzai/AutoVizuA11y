describe("(Alt + W and Alt + Q) Jump to the Extremes of the Chart Test", () => {
	it("should set focus to the extreme elements of the chart", () => {
		cy.visit("/");
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms before handling descriptions
		cy.findAllByTestId("a11y_desc").first().focus().type("{downArrow}");
		cy.findAllByTestId("a11y-chart-element").first().as("firstChartElement").type("{alt}w");
		cy.findAllByTestId("a11y-chart-element").eq(9).should("be.focused").type("{alt}q"); // Checks if the last element is focused
		cy.get("@firstChartElement").should("be.focused"); // Checks if the first element is focused
	});
});
