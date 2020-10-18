context('Podcast search', () => {
  const searchData = {
    term: 'https://podcasts.apple.com/us/podcast/the-joe-rogan-experience/id360084272',
  };

  const submitSearch = (term: string = searchData.term) => {
    cy.visit('/');
    cy.get("input[type='text']").clear().type(term);
    cy.get("button").click();
  };

  describe('podcast', () => {
    // Success 
    context('success', () => {
      context('home', () => {
        beforeEach(() => submitSearch());

        it('redirects to podcast', () => {
          submitSearch()
          cy.location('pathname').should('eq', '/podcast');
        });

        it('renders podcast name', () => {
          cy.location('pathname').should('eq', '/podcast');
          cy.get('.podcast-box__title').wait(1000).contains("The Joe Rogan Experience");
        });

        it('renders more details', () => {
          cy.location('pathname').should('eq', '/podcast');

          cy.get('.podcast-box__menu__more-details').wait(1000).click();
          cy.get('.podcast-box__details__item:first-of-type span:last-of-type').contains('24/12/2009');
        });

        it('toggles more details', () => {
          cy.location('pathname').should('eq', '/podcast');

          cy.get('.podcast-box__menu__more-details').wait(1000).click();
          cy.get('.podcast-box__menu__more-details').click();
          cy.get('.podcast-box__details').should('not.exist');
        });
      });
    });

    // Error
    context('Error', () => {
      context('home', () => {
        context('invalid URL', () => {
          it('displays invalid URL error', () => {
            submitSearch('invalidurl');
            cy.get('.ant-notification-notice-message').wait(1000).contains("Error")
            cy.get('.ant-notification-notice-description').wait(1000).contains("Invalid URL")
          });
        });

        context('not found podcast', () => {
          it('displays Not Found error', () => {
            submitSearch('https://podcasts.apple.com/us/podcast/the-roe-jogan-experience/id9999999');
            cy.get('.ant-notification-notice-message').wait(1000).contains("Error")
            cy.get('.ant-notification-notice-description').wait(1000).contains("Podcast not found")
          });
        });
      });
    });
  });
});