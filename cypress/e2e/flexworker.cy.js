describe("Show and delete flexworker", () => {
    let flexworkerId;
    const timestamp = Date.now();
    const testUser = `TestUser1_${timestamp}`;
    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: 'https://localhost:7031/Flexworker/Register',
            body: {
                name: testUser,
                email: `${testUser}@example.com`,
                phoneNumber: '+1 234 567 8901',
                address: '123 Main St',
                dateOfBirth: '1990-01-01',
                profilePictureUrl: 'https://example.com/profile.jpg',
            }
        }).then(() => {
            // Step 2: Get the latest flexworker from the system
            cy.request({
                method: 'GET',
                url: 'https://localhost:7031/Flexworker/Get?limit=1000&page=0', // Assuming this endpoint retrieves all flexworkers
            }).then((response) => {
                // Step 3: Assume the latest flexworker is the last one in the list
                const flexworkers = response.body;
                flexworkerId = flexworkers[flexworkers.length - 1].id;
            });
        });
    });

    it('should show the flexworker and allow deleting', () => {
        // Step 3: Visit the flexworker details page with the dynamically retrieved ID
        cy.visit(`http://localhost:3000/flexworker/get?id=${flexworkerId}`);

        // Step 4: Check that the flexworker data is loaded
        cy.get('h1').should('contain.text', testUser); // Assuming the name is displayed in an h1
        cy.get('#email').should('have.value', `${testUser}@example.com`);
        cy.get('#phoneNumber').should('have.value', '+1 234 567 8901');
        cy.get('#address').should('have.value', '123 Main St');
        cy.get('#dateOfBirth').should('have.value', '1990-01-01');
        cy.get('#profilePictureUrl').should('have.value', 'https://example.com/profile.jpg');

        // Step 5: Delete the flexworker
        cy.get('.delete-button').find('button').click();  // Assuming delete button is inside a class called '.delete-button'

        // Step 6: Confirm deletion and verify the popup message
        cy.on('window:confirm', () => true);  // Automatically accept the confirmation dialog
        cy.get('.popup').should('contain.text', 'Flexworker deleted successfully!');
    });
})