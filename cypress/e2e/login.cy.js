describe("Login Form Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Başarılı form doldurulduğunda submit edebiliyorum ve success sayfası açılıyor", () => {
    cy.get('[data-testid="email"]').type("test@example.com");
    cy.get('[data-testid="password"]').type("abc123");
    cy.get('[data-testid="checkbox"]').check();

    cy.get('[data-testid="submit-btn"]').should("not.be.disabled");

    cy.get('[data-testid="submit-btn"]').click();

    cy.url().should("include", "/success");
    cy.contains("Success!").should("exist");
  });

  it("Hatalı email girildiğinde: ekranda 1 hata mesajı var, doğru hata mesajı var, buton disabled", () => {
    cy.get('[data-testid="email"]').type("yanlisEmail");
    cy.get('[data-testid="password"]').type("abc123");
    cy.get('[data-testid="checkbox"]').check();

    cy.get(".error").should("have.length", 1);
    cy.contains("Geçerli bir email giriniz.").should("exist");

    cy.get('[data-testid="submit-btn"]').should("be.disabled");
  });

  it("Email ve password yanlış girildiğinde: 2 tane hata mesajı görünür, password hata mesajı var", () => {
    cy.get('[data-testid="email"]').type("yanlisEmail");
    cy.get('[data-testid="password"]').type("123");

    cy.get('[data-testid="checkbox"]').check();

    cy.get(".error").should("have.length", 2);
    cy.contains("Şifre en az 6 karakter olmalı ve sayı + harf içermelidir.").should("exist");

    cy.get('[data-testid="submit-btn"]').should("be.disabled");
  });

  it("Email ve password doğru ama şartları kabul etmedim → buton disabled", () => {
    cy.get('[data-testid="email"]').type("test@example.com");
    cy.get('[data-testid="password"]').type("abc123");

    cy.get('[data-testid="checkbox"]').should("not.be.checked");

    cy.get('[data-testid="submit-btn"]').should("be.disabled");
  });
});
