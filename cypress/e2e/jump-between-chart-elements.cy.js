describe("(Alt + X) Prompt Test", () => {
	it("should open a prompt when Alt + X is pressed and input '2'", () => {
		cy.visit("/");
		cy.injectAxe();
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms before handling descriptions
		cy.window().then((win) => {
			cy.stub(win, "prompt").returns("2").as("prompt"); // Stub the prompt after Alt + X is pressed
			cy.findAllByTestId("a11y_desc").first().focus().type("{downArrow}");
			cy.findAllByTestId("a11y-chart-element").first().as("firstChartElement").type("{alt}x"); // Simulate pressing Alt + X inside of the chart
			cy.get("@prompt").should("have.been.calledOnce"); // Verify the prompt was triggered and user input '2'
			cy.get("@firstChartElement").type("{rightArrow}");
			cy.findAllByTestId("a11y-chart-element").eq(2).should("be.focused"); // Checks if the third element is focused
		});
		cy.checkA11y();
	});
});
