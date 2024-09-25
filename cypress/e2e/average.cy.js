describe("(Alt + K) Average Test", () => {
	it("should alert the correct average value for the first chart", () => {
		cy.visit("/");
		cy.get('[data-testid="manual-descriptions-option"]').click();
		cy.wait(500); // Wait for 0.5 seconds
		cy.get('[data-testid="a11y_desc"]').eq(0).focus().type("{alt}k");

		cy.get('[data-testid="a11y-chart-alert"]')
			.eq(0)
			.should((chart) => {
				expect(chart).to.have.text("The average is 456.99"); // Checks if the average is alerted and correct
			});
	});
});
