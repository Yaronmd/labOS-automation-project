import cypress = require("cypress");
import 'cypress-xpath';

class OrderPage {

    private facilityInputPath = "//*[text()='Facility']//ancestor::label//parent::div//input"
    private physicianInputPath = "//*[text()='Physician']//ancestor::label//parent::div//input"

    private searchFacility(input:string){

        cy.xpath(this.facilityInputPath).type(input)
    }
    private selectFromDropdown(input:string){
        const path = `//span[text()='${input}']`
        cy.xpath(path).click()
    }
    searchAndSelectFacility(input:string){
        this.searchFacility(input)
        this.selectFromDropdown(input)
    }
    
    validatePhysicianLoadedWithText(input:string){
        cy.xpath(this.physicianInputPath)
          .invoke('val')  // Get the value of the input field
          .should('equal', input)  // Assert the value is the one you're expecting
          .then((text) => {
            cy.log("Extracted text: " + text);
          });
    }
    

  }
  
  export default new OrderPage();
