describe("(Alt + Z) Compare to Rest of the Chart Test", () => {
	it("should alert the correct comparison value between the first element and rest of the chart", () => {
		cy.visit("/");
		cy.get('[data-testid="manual-descriptions-option"]').click();
		cy.wait(500); // Wait for 0.5 seconds
		cy.get('[data-testid="a11y_desc"]').eq(0).focus().type("{alt}z");

		cy.get('[data-testid="a11y-chart-alert"]')
			.eq(0)
			.should((chart) => {
				expect(chart).to.have.text("This shortcut only works inside a chart"); // Checks if the error is alerted
			});

		cy.get('[data-testid="a11y_desc"]').eq(0).type("{downArrow}");

		cy.get('[data-testid="a11y-chart-element"]').eq(0).type("{alt}z");

		cy.get('[data-testid="a11y-chart-alert"]')
			.eq(0)
			.should((chart) => {
				expect(chart).to.have.text("This is the highest value."); // Checks if the comparison is alerted and correct
			});
	});
});
