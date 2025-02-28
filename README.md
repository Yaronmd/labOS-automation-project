# Labos Automation Project

This project is built using [Cypress](https://www.cypress.io/) for end-to-end (E2E) automation testing.

## Project Overview

Labos Automation Project is designed to automate testing scenarios for the Labos application. It includes test cases that verify login functionality, form validation, and other critical workflows.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

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

## Running Tests

### Run All Tests in Headless Mode

```sh
npm run cypress:run
```

### Open Cypress Test Runner

```sh
npm run cypress:open
```

## Project Structure

```
labos-automation/
│── cypress/
│   ├── e2e/           # e2e Test 
│   ├── pages/          
│── cypress.json        # Cypress configuration file
│── package.json        # Project dependencies and scripts
│── README.md           # Project documentation
```

## License

This project is licensed under the MIT License.

