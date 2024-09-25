describe("(Alt + X) Prompt Test", () => {
	it("should open a prompt when Alt + X is pressed and input '2'", () => {
		cy.visit("/");
		cy.get('[data-testid="manual-descriptions-option"]').click();
		cy.wait(500); // AutoVizuA11y waits 500ms beofre handling descriptions
		cy.window().then((win) => {
			cy.stub(win, "prompt").returns("2").as("prompt"); // Stub the prompt after Alt + X is pressed
			cy.get('[data-testid="a11y_desc"]').eq(0).focus().type("{downArrow}");
			cy.get('[data-testid="a11y-chart-element"]').eq(0).type("{alt}x"); // Simulate pressing Alt + X inside of the chart
			cy.get("@prompt").should("have.been.calledOnce"); // Verify the prompt was triggered and user input '2'
			cy.get('[data-testid="a11y-chart-element"]').eq(0).type("{rightArrow}");
			cy.get('[data-testid="a11y-chart-element"]').eq(2).should("be.focused"); // Checks if the third element is focused
		});
	});
});
