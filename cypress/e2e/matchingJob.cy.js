describe("Find a suitable flexworker for a job", () => {


// goto http://localhost:3000/job/get?id=55 and click on the button to find a suitable flexworker

    it('should show the job and allow finding a suitable flexworker', () => {
        cy.visit('http://localhost:3000/job/get?id=55');
        cy.wait(1000);
        cy.get('button').contains('Find Flexworkers').click();
        // it should show the loading animation
        cy.get('.loading-screen').should('be.visible');
        cy.wait(3200);
        cy.get('.matching-page').should('be.visible');

        cy.get('.matches').children().should('have.length', 2);

        cy.get('.matches .match').first().find('.compatibility').should('have.text', '100%');

        cy.get('.matches .match').eq(1).find('.compatibility').should('have.text', '67%');

    });

});