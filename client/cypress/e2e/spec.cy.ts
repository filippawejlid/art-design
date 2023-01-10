describe("user view", () => {
  it("starts", () => {
    cy.visit("http://127.0.0.1:5173/");
  });
  it("goes to product page", () => {
    cy.visit("http://127.0.0.1:5173/");
    cy.get(".btn").click();
    cy.url().should("include", "/products");
  });
  it("goes to product page", () => {
    cy.visit("http://127.0.0.1:5173/products");
    cy.get(".btn").click();
    cy.url().should("include", "/products");
  });
});
