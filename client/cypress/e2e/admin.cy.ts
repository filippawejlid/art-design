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

  it("gets products on startpage", () => {
    cy.visit("http://127.0.0.1:5173/login");
    cy.get("#username").type("DianaB");
    cy.get("#password").type("hej123");
    cy.get(".p-button").click();
    cy.get(".products > :nth-child(1)").should("exist");
  });

  it("gets products on edit", () => {
    cy.visit("http://127.0.0.1:5173/login");
    cy.get("#username").type("DianaB");
    cy.get("#password").type("hej123");
    cy.get(".p-button").click();
    cy.get(".p-tabmenuitem:nth-of-type(2)").click();
    cy.get(".products > :nth-child(1)").should("exist");
  });

  it("gets orders on view orders", () => {
    cy.visit("http://127.0.0.1:5173/login");
    cy.get("#username").type("DianaB");
    cy.get("#password").type("hej123");
    cy.get(".p-button").click();
    cy.get(".p-tabmenuitem:nth-of-type(4)").click();
    cy.get(".orders > :nth-child(1)").should("exist");
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
