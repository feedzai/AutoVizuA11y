describe("(Alt + M) Move Between Data Series Test", () => {
	it("should move to the next series of data", () => {
		cy.visit("/");
		cy.get('[data-testid="manual-descriptions-option"]').click();
		cy.wait(500); // AutoVizuA11y waits 500ms beofre handling descriptions
		cy.get('[data-testid="a11y_desc"]').eq(0).focus().tab().tab().type("{downArrow}");
		cy.get('[data-testid="a11y-chart-element"]').eq(14).should("be.focused"); // Checks if the first element of the first series is focused
		cy.get(":focus").type("{alt}m");
		cy.get('[data-testid="a11y-chart-alert"]')
			.eq(0)
			.should((chart) => {
				expect(chart).to.have.text("\u00A0"); // Checks if no error was alerted
			});
		cy.get('[data-testid="a11y-chart-element"]').eq(18).should("be.focused"); // Checks if the first element of the second series is focused
	});
});
