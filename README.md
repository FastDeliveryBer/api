# API

## Clone project

`$ git clone git@github.com:FastDeliveryBer/api.git`

`$ cd api`

## Installation

### Installer les dependences

`$ npm i`

### Installer le formatter Prettier

https://prettier.io/

### Installer le linter ESLint

https://eslint.org/

## Lancer le projet

Test Jest

`$ npm test`

Test Jest coverage

`$ npm test:coverage`

Test linter

`$ npm lint`

Test linter et fix

`$ npm lint:fix`

Developpement

`$ npm run dev`

Production

`$ npm start`

## Variables d'environnement

- `PORT`: port on which the server will listen requests, default `4500`
- `MONGODB_URI`: URI for MongoDB database connexion
- `DB_NAME`: MongoDB database name
