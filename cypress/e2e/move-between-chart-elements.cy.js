describe("(Right and Left Arrow) Move Between Elements of the Chart Test", () => {
	it("should move to the next and previous chart elements", () => {
		cy.visit("/");
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms before handling descriptions
		cy.findAllByTestId("a11y_desc").first().focus().type("{downArrow}");
		cy.findAllByTestId("a11y-chart-element").first().as("firstChartElement").type("{rightArrow}");
		cy.findAllByTestId("a11y-chart-element").eq(1).should("be.focused").type("{leftArrow}"); // Checks if the second element is focused
		cy.get("@firstChartElement").should("be.focused"); // Checks if the first element is focused
	});
});
