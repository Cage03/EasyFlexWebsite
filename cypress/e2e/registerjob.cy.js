describe("Register job page", () => {
    beforeEach(() =>{

        cy.visit("http://localhost:3000/job/register")
    });

    it("Successfully registers a new job", () => {
        const timestamp = Date.now();
        const testJob = `TestJob1_${timestamp}`;
        cy.wait(2000);

        // Fill in the form fields
        cy.get('#name').clear().type(testJob);
        cy.get('#address').clear().type('123 Main Street');
        cy.get('#description').clear().type('This is a test job description.');
        cy.get('#min-hours').clear().type('10');
        cy.get('#max-hours').clear().type('40');
        cy.get('#start-date').clear().type('2024-12-01');
        cy.get('#end-date').clear().type('2024-12-31');

        cy.get('#register-button').click();

        cy.contains('Job successfully registered!').should('be.visible');

        cy.get('button').contains('Close').click();

        cy.url().should('include', '/job/get?id=');
    })

    it('Handles server errors gracefully', () => {
        const timestamp = Date.now();
        const testJobName = `Test Job ${timestamp}`;
        cy.wait(2000);

        // Fill in the form fields
        cy.get('#name').clear().type(testJobName);
        cy.get('#address').clear().type('123 Main Street');
        cy.get('#description').clear().type('This is a test job description.');
        cy.get('#min-hours').clear().type('10');
        cy.get('#max-hours').clear().type('40');
        cy.get('#start-date').clear().type('2024-12-01');
        cy.get('#end-date').clear().type('2024-12-31');

        // Stub the API request to simulate a server error
        cy.intercept('POST', '**/Job/Register', {
            statusCode: 500,
            body: { message: 'Internal Server Error' },
        }).as('registerJobError');

        // Submit the form
        cy.get('#register-button').click();

        // Wait for the API request to complete
        cy.wait('@registerJobError').then((interception) => {
            expect(interception.response.statusCode).to.eq(500);
        });

        // Verify the error popup message
        cy.contains('Registration failed!').should('be.visible');
    });
})
