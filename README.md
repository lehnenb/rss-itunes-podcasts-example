#Running application:

  Front-end:
    - cd consumer && yarn start

  Back-end:
    - cd server && yarn server:watch

  Integration Tests:
    - yarn server:build # Grab some coffee, this will take a while
    - yarn test # Without Cypress interface
    - yarn test:open # With Cypress interface and without video generation
