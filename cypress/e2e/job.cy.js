describe('show and delete job', () => {
    let jobId;
    const timestamp = Date.now();
    const testJob = `TestJob1_${timestamp}`;
    beforeEach(() => {
        const api_url = Cypress.env('API_URL');
        cy.log(`API URL: ${api_url}`);
        cy.request({
            method: 'POST',
            url: `${api_url}/Job/Register`,
            body: {
                name: testJob,
                address: '123 Main Street',
                description: 'This is a test job description.',
                minHours: 10,
                maxHours: 40,
                startDate: '2024-12-01',
                endDate: '2024-12-31',
            }
        }).then(() => {
            // Get the latest job from the system
            cy.request({
                method: 'GET',
                url: `${api_url}/Job/GetJobs?limit=1000&pageNumber=1`,
            }).then((response) => {
                // Assume the latest job is the last one in the list
                const jobs = response.body;
                jobId = jobs[jobs.length - 1].id;
            });
        });
    });

    it('should show the job and allow deleting', () => {
        // Visit the job details page with the dynamically retrieved ID
        cy.visit(`http://localhost:3000/job/get?id=${jobId}`);

        // Check that the job data is loaded
        cy.get('h1').should('contain.text', testJob);
        cy.get('#address').should('have.value', '123 Main Street');
        cy.get('#description').should('have.value', 'This is a test job description.');
        cy.get('#min-hours').should('have.value', '10');
        cy.get('#max-hours').should('have.value', '40');
        cy.get('#start-date').should('have.value', '2024-12-01');
        cy.get('#end-date').should('have.value', '2024-12-31');

        // Delete the job
        cy.get('button').contains('Delete').click();
        cy.on('window:confirm', () => true);
        cy.get('button').contains('Close').click();

        // Verify that the job is no longer in the list
        cy.visit('http://localhost:3000/job');
        cy.wait(2000);
        cy.get('p').should('not.contain.text', testJob);
    });
});