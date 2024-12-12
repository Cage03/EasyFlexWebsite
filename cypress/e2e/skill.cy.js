describe("Show edit and delete skill", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/category');
    });

    it("Should show the category page", () => {
        cy.get('h1').should('contain.text', 'Category');
    });

    it('should add a skill', () => {
        cy.wait(1000);
        cy.get('div').contains('Languages').click();
        cy.get('div').contains('Languages').parent().parent().find('button.yellow.button').click();
        cy.get('#skill_name_input').type('Test Skill');
        cy.get('#confirm_add_skill').find('button').click();
    });

    it('should edit a skill', () => {
        cy.wait(1000);
        cy.get('div').contains('Languages').click();
        cy.get('div').contains('Test Skill').click();
        cy.get('input[value="Test Skill"]').clear().type('Test Skill 2');
        cy.get('button.blue.button').contains('Update').click();
        cy.get('#popup').find('.popup-content').find('.popup-text').should('contain.text', 'Skill updated successfully');
        cy.get('#popup').find('.popup-content').find('button').click();
        cy.get('div').contains('Languages').click();
        cy.get('div').contains('Test Skill 2').should('exist');
    });

    it('should delete a skill', () => {
        cy.wait(1000);
        cy.get('div').contains('Languages').click();
        cy.get('div').contains('Test Skill 2').click();
        cy.get('button').contains('Delete').click();
        cy.on('window:confirm', () => true);
        cy.get('button').contains('Close').click();
        cy.get('div').contains('Test Skill 2').should('not.exist');
    });
});