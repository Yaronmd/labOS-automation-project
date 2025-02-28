# Labos Automation Project

This project is built using [Cypress](https://www.cypress.io/) for end-to-end (E2E) automation testing.

## Project Overview

Labos Automation Project is designed to automate testing scenarios for the Labos application. It includes test cases that verify login functionality, form validation, and other critical workflows.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/labos-automation.git
   cd labos-automation
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Test Scenarios

### E2E Tests

- Order Creation and Validation - The test selects a facility, physician, and patient, adds an item to the order, submits the order while intercepting the request, extracts the order number from the UI, validates the response, and ensures fields are cleared.

### Login Tests

- Validate login without credentials
- Validate login with incorrect credentials

### Order Tests

- Validate missing fields in Order page

  

## Running Tests

### Run All Tests in Headless Mode

```sh
npx cypress run
```

### Open Cypress Test Runner

```sh
npx cypress open
```

## Project Structure

```
labos-automation/
│── cypress/
│   ├── tests/            
│   ├── pages/
│       ├── BasePage.ts   # holds common functiontlity
│       ├── DashboardPage.ts
│       ├── LoginPage.ts
│       ├── OrderPage.ts          
│── cypress.json        # Cypress configuration file
│── package.json        # Project dependencies and scripts
│── README.md           # Project documentation
```

## License

This project is licensed under the MIT License.

