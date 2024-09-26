describe("(Alt + M) Move Between Data Series Test", () => {
	it("should move to the next series of data", () => {
		cy.visit("/");
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms before handling descriptions
		cy.findAllByTestId("a11y_desc").first().focus().tab().tab().type("{downArrow}");
		cy.findAllByTestId("a11y-chart-element").eq(14).should("be.focused"); // Checks if the first element of the first series is focused
		cy.get(":focus").type("{alt}m");
		cy.findAllByTestId("a11y-chart-alert").first().should("have.text", "\u00A0"); // Checks if no error was alerted
		cy.findAllByTestId("a11y-chart-element").eq(18).should("be.focused"); // Checks if the first element of the second series is focused
	});
});
