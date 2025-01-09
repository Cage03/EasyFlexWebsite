describe("Show and delete flexworker", () => {
    let flexworkerId;
    const timestamp = Date.now();
    const testUser = `TestUser1_${timestamp}`;
    beforeEach(() => {
        const api_url = Cypress.env('TEST_API_URL');
        cy.log(`API URL: ${api_url}`);

        cy.request({
            method: 'POST',
            url: `${api_url}/Flexworker/Register`,
            body: {
                name: testUser,
                email: `${testUser}@example.com`,
                phoneNumber: '+1 234 567 8901',
                address: '123 Main St',
                dateOfBirth: '1990-01-01',
                profilePictureUrl: 'https://example.com/profile.jpg',
            }
        }).then(() => {
            // Get the latest flexworker from the system
            cy.request({
                method: 'GET',
                url: `${api_url}/Flexworker/Get?limit=1000&page=0`,
            }).then((response) => {
                // Assume the latest flexworker is the last one in the list
                const flexworkers = response.body;
                flexworkerId = flexworkers[flexworkers.length - 1].id;
            });
        });
    });

    it('Add and delete skills to flexworker', () => {
        // add skill
        cy.visit(`http://localhost:3000/flexworker/get?id=${flexworkerId}`);
        cy.get('h1').should('contain.text', testUser);
        cy.get('#add-skills').click();
        cy.get('div').contains('Languages').click();

        cy.get('div').contains('Languages').parent().parent().find('button.yellow.button').click();
        cy.get('div').contains('English').click();
        cy.get('button.red.button').click();
        cy.get('.features').should('contain.text', 'English');

        // delete skill
        cy.get('#add-skills').click();
        cy.get('div').contains('Languages').click();
        cy.get('div').contains('English').click();
        cy.on('window:confirm', () => true);
        cy.get('button.red.button').click();
        cy.get('.features').should('not.exist');
    });

    it('should show the flexworker and allow deleting', () => {
        // Visit the flexworker details page with the dynamically retrieved ID
        cy.visit(`http://localhost:3000/flexworker/get?id=${flexworkerId}`);

        // Check that the flexworker data is loaded
        cy.get('h1').should('contain.text', testUser);
        cy.get('#email').should('have.value', `${testUser}@example.com`);
        cy.get('#phoneNumber').should('have.value', '+1 234 567 8901');
        cy.get('#address').should('have.value', '123 Main St');
        cy.get('#dateOfBirth').should('have.value', '1990-01-01');
        cy.get('#profilePictureUrl').should('have.value', 'https://example.com/profile.jpg');

        // Delete the flexworker
        cy.get('.delete-button').find('button').click();

        // Confirm deletion and verify the popup message
        cy.on('window:confirm', () => true);  // Automatically accept the confirmation dialog
        cy.get('#popup').should('contain.text', 'Flexworker deleted successfully!');

        cy.get('button').contains('Close').click();

        cy.visit(`http://localhost:3000/flexworker/get?id=${flexworkerId}`);

        cy.get('#popup').should('contain.text', 'Error occurred while fetching flexworker data.');
    });

})