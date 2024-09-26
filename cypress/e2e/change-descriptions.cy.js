describe("(Alt + S and Alt + B) Change Chart Description Test", () => {
	it("should toggle between longer and shorter descriptions", () => {
		cy.visit("/");
		cy.injectAxe();
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // Wait for AutoVizuA11y to handle descriptions
		cy.findAllByTestId("a11y_desc").first().as("chartDescription");
		cy.get("@chartDescription")
			.invoke("attr", "aria-label")
			.then((shortDescription) => {
				cy.get("@chartDescription")
					.focus()
					.type("{alt}b")
					.invoke("attr", "aria-label")
					.should("not.equal", shortDescription); // Assert that the aria-label has changed
				cy.get("@chartDescription")
					.focus()
					.type("{alt}s")
					.invoke("attr", "aria-label")
					.should("equal", shortDescription); // Assert that the aria-label reverted back
			});
		cy.checkA11y();
	});
});
