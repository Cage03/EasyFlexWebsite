describe("Show edit and delete category", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/category');
    });

    it("Should show the category page", () => {
        cy.get('h1').should('contain.text', 'Category');
    });

    it('should add a category', () => {
        cy.wait(2000);
        cy.get('.functionality').find('button.yellow.button').click();
        cy.get('input[placeholder="Name"]').type('Test Category');
        cy.get('button').contains('Confirm').click();
        cy.on('window:confirm', () => true);
        cy.get('button').contains('Close').click();
        cy.visit('http://localhost:3000/category');
        cy.wait(2000);
        cy.get('p').should('contain.text', 'Test Category');
    });

    it('should edit a category', () => {
        cy.wait(2000);
        cy.get('p').contains('Test Category').parent().parent().find('button.transparent.button').click();
        // get input with value Test Category and change it to Test Category 2
        cy.get('input[value="Test Category"]').clear().type('Test Category 2');
        cy.get('button').contains('Update').click();
        cy.on('window:confirm', () => true);
        cy.get('button').contains('Close').click();
        cy.get('p').should('contain.text', 'Test Category 2');
    });

    it('should delete a category', () => {
        cy.wait(1000);
        cy.get('p').contains('Test Category').parent().parent().find('button.transparent.button').click();
        cy.get('button').contains('Delete').click();
        cy.on('window:confirm', () => true);
        cy.get('button').contains('Close').click();
        cy.visit('http://localhost:3000/category');
        cy.wait(1000);
        cy.get('p').should('not.contain.text', 'Test Category 2');
    });
});