import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.spec.ts',  // Specify custom spec file pattern
    setupNodeEvents(on, config) {
      // Implement node event listeners here, if needed
      on('before:run', () => {
        console.log('Before running tests');
      });

      return config;
    },
    // baseUrl: 'http://localhost:3000', // Example base URL, adjust as necessary
  },
});
