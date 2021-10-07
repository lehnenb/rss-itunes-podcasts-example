# Itunes podcasts application
 Sample application for searching podcasts using Itunes API and RSS-Feed

# Running the application:

  ## Front-end:
    - cd consumer && yarn start

  ## Back-end:
    - cd server && yarn server:watch

  ## Integration Tests:
    - yarn server:build # Grab some coffee, this will take a while
    - yarn test # Without Cypress interface
    - yarn test:open # With Cypress interface and without video generation
