describe("(Alt + K) Average Test", () => {
	it("should alert the correct average value for the first chart", () => {
		cy.visit("/");
		cy.injectAxe();
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms before handling descriptions
		cy.findAllByTestId("a11y_desc").first().focus().type("{alt}k");
		cy.findAllByTestId("a11y-chart-alert").first().should("have.text", "The average is 456.99"); // Checks if the average is alerted and correct
		cy.checkA11y();
	});
});
