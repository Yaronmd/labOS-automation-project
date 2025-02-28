import cypress = require("cypress");
import 'cypress-xpath';

class BasePage {
    private toolTipPath = "#st-tooltip"
    private WarnningMessageGenralPath = "//*[contains(@id,'mat-mdc-error')]"

    hoverAndValidateTooltip(tooltipSelector: string, expectedText?: string) {
        cy.xpath(tooltipSelector).trigger("mouseover").wait(1000);
    
        cy.get(this.toolTipPath)
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

    getPopupMessage(selector:string){
        
        cy.xpath(selector).trigger("mouseover").wait(2000);

        return cy.xpath(selector)
        .should("exist")
        .should('be.visible') // Ensure tooltip is visible
        .invoke('text') // Extract text
        .then((text) => text.trim()); // Trim spaces for clean validation
    }

    getListofWarningMessages(){
        return cy.xpath(this.WarnningMessageGenralPath)
        .then(($els) => {
            // Create an array to store the text of each warning message
            let warningMessages: string[] = [];
            
            // Iterate over each element and push its text into the array
            $els.each((index, el) => {
                warningMessages.push(el.innerText.trim());
            });

            // Log the warning messages
            cy.log('Warning Messages:', warningMessages);

            // Return the warning messages array using cy.wrap to chain further Cypress commands
            return cy.wrap(warningMessages);
        });
    }
    

}

export default BasePage;