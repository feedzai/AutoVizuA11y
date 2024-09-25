describe("(Alt + S and Alt + B) Change Chart Description Test", () => {
	it("should correctly switch between longer and shorter descriptions", () => {
		cy.visit("/");
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500); // AutoVizuA11y waits 500ms beofre handling descriptions
		cy.findAllByTestId("a11y_desc") // Get the initial aria-label value
			.eq(0)
			.invoke("attr", "aria-label")
			.then((shorterDescription) => {
				cy.findAllByTestId("a11y_desc").eq(0).focus().type("{alt}b");
				cy.findAllByTestId("a11y_desc")
					.eq(0)
					.invoke("attr", "aria-label")
					.then((longerDescription) => {
						expect(shorterDescription).not.to.equal(longerDescription); // Assert that the aria-label has changed
						cy.findAllByTestId("a11y_desc").eq(0).focus().type("{alt}s");
						cy.findAllByTestId("a11y_desc")
							.eq(0)
							.invoke("attr", "aria-label")
							.then((revertedShorterDescription) => {
								expect(revertedShorterDescription).to.equal(shorterDescription); // Assert that the aria-label reverted back to the initial value
							});
					});
			});
	});
});
