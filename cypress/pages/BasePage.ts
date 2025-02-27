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

}

export default BasePage;