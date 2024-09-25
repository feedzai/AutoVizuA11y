describe("(Right and Left Arrow) Move Between Elements of the Chart Test", () => {
	it("should move to the next and previous chart elements", () => {
		cy.visit("/");
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms beofre handling descriptions
		cy.findAllByTestId("a11y_desc").eq(0).focus().type("{downArrow}");
		cy.findAllByTestId("a11y-chart-element").eq(0).type("{rightArrow}");
		cy.findAllByTestId("a11y-chart-element").eq(1).should("be.focused").type("{leftArrow}"); // Checks if the second element is focused
		cy.findAllByTestId("a11y-chart-element").eq(0).should("be.focused"); // Checks if the first element is focused
	});
});
