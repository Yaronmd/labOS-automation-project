import cypress = require("cypress");
import 'cypress-xpath';

class BasePage {

    hoverAndValidateTooltip(tooltipSelector: string, expectedText?: string) {
        cy.xpath(tooltipSelector).trigger("mouseover").wait(1000);
    
        cy.get("#st-tooltip")
          .should("exist")
          .invoke("text")
          .then((tooltipText) => {
              if (expectedText) {
                  // Fail if the text does not match
                  expect(tooltipText.trim()).to.equal(expectedText);
              } else {
                  // Log the tooltip text if no expected value is provided
                  cy.log("Tooltip text:", tooltipText.trim());
              }
          });
    }


    getListOfTextsByXpath(selector: string): Cypress.Chainable<string[]> {
        return cy.xpath(selector)
            .should('exist')  // Ensure elements exist
            .should('be.visible') // Ensure elements are visible
            .then(($elements) => {
                return Cypress._.map($elements, (el) => el.innerText.trim()); // Extract & trim text
            });
    }

}

export default BasePage;