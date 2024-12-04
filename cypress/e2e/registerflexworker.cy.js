describe('Register Flexworker Page', () => {
  beforeEach(() => {
    // Visit the registration page before each test
    cy.visit('http://localhost:3000/flexworker/register');
  });

  it('Successfully registers a new flexworker', () => {
    const timestamp = Date.now();
    const testUser = `TestUser1_${timestamp}`;

    cy.wait(2000);
    cy.get('[id="name-input"]').focus();
    cy.get('[id="name-input"]').type(testUser);
    cy.get('[id="address-input"]').type('1234 Elm Street');
    cy.get('[id="dob-input"]').type('1990-01-01');
    cy.get('[id="email-input"]').type(`${testUser}@example.com`);
    cy.get('[id="phone-input"]').type('+12345678901');
    cy.get('[id="profile-picture-input"]').type('http://example.com/profile.jpg');

    cy.contains('Register').click();

    cy.contains('Registration successful!').should('be.visible');

    cy.url().should('include', '/flexworker');
  });

  it('Displays error popup on registration failure', () => {

    const timestamp = Date.now();
    const testUser = `TestUser1_${timestamp}`;

    cy.wait(2000)
    cy.get('[id="name-input"]').type(testUser);
    cy.get('[id="address-input"]').type('1234 Elm Street');
    cy.get('[id="dob-input"]').type('1990-01-01');
    cy.get('[id="email-input"]').type(`${testUser}@example.com`);
    cy.get('[id="phone-input"]').type('+12345678901');
    cy.get('[id="profile-picture-input"]').type('http://example.com/profile.jpg');

    // Stub the API request to simulate failure
    cy.intercept('POST', '**/Flexworker/Register', {
      statusCode: 500,
      body: 'Failed to register flexworker',
    }).as('registerFlexworker');

    cy.contains('Register').click();

    cy.wait('@registerFlexworker').then((interception) => {
      expect(interception.response.statusCode).to.eq(500);
    });

    cy.contains('Failed to register flexworker').should('be.visible');
  });
});
