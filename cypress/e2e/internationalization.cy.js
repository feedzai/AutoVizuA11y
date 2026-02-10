/* eslint-disable no-undef */
describe("Internationalization Tests", () => {
	it("should use default English (en-GB) language when internationalization property is empty", () => {
		cy.visit("/");
		cy.injectAxe();
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500);
		cy.findAllByTestId("a11y_desc").first().focus();
		cy.focused().type("{alt}k");
		cy.findAllByTestId("a11y-chart-alert").first().should("contain.text", "The average is");
		cy.focused().type("?");
		cy.get("dialog").should("be.visible");
		cy.get("dialog h2").should("contain.text", "Shortcut guide");
		cy.focused().type("{esc}");
		cy.checkA11y();
	});

	it("should use default Portuguese (pt-PT) language when language property is pt-PT", () => {
		cy.visit("/");
		cy.injectAxe();
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500);
		cy.findAllByTestId("a11y_desc").first().focus().tab().tab();
		cy.focused().type("{alt}k");
		cy.findAllByTestId("a11y-chart-alert").eq(2).should("contain.text", "A média é");
		cy.focused().type("?");
		cy.get("dialog").should("be.visible");
		cy.get("dialog h2").should("contain.text", "Guia de atalhos");
		cy.focused().type("{esc}");
		cy.checkA11y();
	});

	it("should use an overriten en-GB string", () => {
		cy.visit("/");
		cy.injectAxe();
		cy.findByTestId("manual-descriptions-option").click();
		cy.wait(500);
		cy.findAllByTestId("a11y_desc").first().focus().tab().tab();
		cy.focused().type("?");
		cy.get("dialog").should("be.visible");
		cy.get("dialog h2").should("contain.text", "Overwritten Shortcut guide title");
		cy.focused().type("{esc}");
		cy.checkA11y();
	});
});
