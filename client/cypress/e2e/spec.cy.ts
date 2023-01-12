describe("it tests user purchase", () => {
  it("starts", () => {
    cy.visit("http://127.0.0.1:5173/");
  });
  it("goes to product page", () => {
    cy.visit("http://127.0.0.1:5173/");
    cy.get(".btn").click();
    cy.url().should("include", "/products");
  });
  it("shows product", () => {
    cy.visit("http://127.0.0.1:5173/products");
    cy.get(".product:first-child").should("exist");
  });
  it("opens product modal", () => {
    cy.visit("http://127.0.0.1:5173/products");
    cy.get(".product:first-child").click();
    cy.get(".p-dialog").should("exist");
  });
  it("adds product to cart", () => {
    cy.visit("http://127.0.0.1:5173/products");
    cy.get(".product:first-child").click();
    cy.get(".p-button").click();
    cy.get(".p-dialog-header-close-icon").click();
    cy.get(".pi-shopping-cart").click({ force: true });
    cy.get(".cart-products").should("have.length", 1);
  });
  it("goes to checkout", () => {
    cy.visit("http://127.0.0.1:5173/products");
    cy.get(".product:first-child").click();
    cy.get(".p-button").click();
    cy.get(".p-dialog-header-close-icon").click();
    cy.get(".pi-shopping-cart").click();
    cy.get(".go-to-checkout").click();
    cy.url().should("include", "/checkout");
  });
  it("places an order and empties cart", () => {
    cy.visit("http://127.0.0.1:5173/products");
    cy.get(".product:first-child").click();
    cy.get(".p-button").click();
    cy.get(".p-dialog-header-close-icon").click();
    cy.get(".pi-shopping-cart").click();
    cy.get(".go-to-checkout").click();
    cy.get("#firstName").type("Filippa");
    cy.get("#lastName").type("Bellange");
    cy.get("#email").type("filippa.bellange@gmail.com");
    cy.get("#numbers").type("1234567891234567");
    cy.get("#name").type("filippa bellange");
    cy.get("#date").type("1124");
    cy.get("#cvc").type("123");
    cy.get(".p-checkbox-box").click();
    cy.get(".pay-button").click();
    cy.url().should("include", "/confirmation");
    cy.get(".pi-shopping-cart").click();
    cy.get(".cart-products").should("contain.text", "Din varukorg är tom...");
  });
});
