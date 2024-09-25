describe("(Alt + S and Alt + B) Change Chart Description Test", () => {
	it("should correctly switch between longer and shorter descriptions", () => {
		cy.visit("/");
		cy.get('[data-testid="manual-descriptions-option"]').click();
		cy.wait(500); // AutoVizuA11y waits 500ms beofre handling descriptions

		cy.get('[data-testid="a11y_desc"]') // Get the initial aria-label value
			.eq(0)
			.invoke("attr", "aria-label")
			.then((shorterDescription) => {
				cy.get('[data-testid="a11y_desc"]').eq(0).focus().type("{alt}b");
				cy.get('[data-testid="a11y_desc"]')
					.eq(0)
					.invoke("attr", "aria-label")
					.then((longerDescription) => {
						expect(shorterDescription).not.to.equal(longerDescription); // Assert that the aria-label has changed
						cy.get('[data-testid="a11y_desc"]').eq(0).focus().type("{alt}s");
						cy.get('[data-testid="a11y_desc"]')
							.eq(0)
							.invoke("attr", "aria-label")
							.then((revertedShorterDescription) => {
								expect(revertedShorterDescription).to.equal(shorterDescription); // Assert that the aria-label reverted back to the initial value
							});
					});
			});
	});
});
