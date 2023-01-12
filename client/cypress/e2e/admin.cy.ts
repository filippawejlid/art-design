describe("it tests user purchase", () => {
  it("starts", () => {
    cy.visit("http://127.0.0.1:5173/");
  });
  it("goes to login form", () => {
    cy.visit("http://127.0.0.1:5173/products");
    cy.get(".link").click();
    cy.url().should("include", "/login");
  });
  it("logs admin in", () => {
    cy.visit("http://127.0.0.1:5173/products");
    cy.get(".link").click();
    cy.get("#username").type("DianaB");
    cy.get("#password").type("hej123");
    cy.get(".p-button").click();
    cy.url().should("include", "/admin");
  });
  it("logs admin out", () => {
    cy.visit("http://127.0.0.1:5173/products");
    cy.get(".link").click();
    cy.get("#username").type("DianaB");
    cy.get("#password").type("hej123");
    cy.get(".p-button").click();
    cy.get(".p-tabmenuitem:nth-of-type(5)").click();
    cy.url().should("not.include", "/admin");
  });
});
