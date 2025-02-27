import cypress = require("cypress");
import 'cypress-xpath';

class OrderPage {

    private static readonly FACILITY = "Facility";
    private static readonly PHYSICIAN = "Physician";
    private static readonly PATIENT = "Patient by ID, first name, last name"
    
    private getFieliedInputPath(by_input:string){
        return `//*[text()='${by_input}']//ancestor::label//parent::div//input`
    }
    private searchFacility(input:string){

        cy.xpath(this.getFieliedInputPath(OrderPage.FACILITY)).type(input)
    }
    private searchPatient(input:string){
        cy.xpath(this.getFieliedInputPath(OrderPage.PATIENT)).type(input)
    }
    private selectFromDropdown(input:string){
        const path = `//span[contains(text(),'${input}')]`
        cy.xpath(path).click()
    }
    searchAndSelectFacility(input:string){
        this.searchFacility(input)
        this.selectFromDropdown(input)
    
    }
    searchAndSelectPatient(input:string){
        this.searchPatient(input)
        this.selectFromDropdown(input)
    }

    validatePhysicianLoadedWithText(input:string){
        cy.xpath(this.getFieliedInputPath(OrderPage.PHYSICIAN))
          .invoke('val')  // Get the value of the input field
          .should('equal', input)  // Assert the value is the one you're expecting
          .then((text) => {
            cy.log("Extracted text: " + text);
          });
    }
    
    
  }
  
  export default new OrderPage();
