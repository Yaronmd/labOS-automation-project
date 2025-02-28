import cypress = require("cypress");
import 'cypress-xpath';
import BasePage from "./BasePage";


class OrderPage extends BasePage{

    private static readonly FACILITY = "Facility";
    private static readonly PHYSICIAN = "Physician";
    private static readonly PATIENT = "Patient by ID, first name, last name"

    
    private orderListItems = "//*[contains(@class,'st-selected-tests-container')]//*[contains(@class,'st-test-text')]"
    private saveButtonPath = "#st-button-save"
    
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
    validatePatientLoadedWithText(input:string){
        cy.xpath(this.getFieliedInputPath(OrderPage.PATIENT))
          .invoke('val')  // Get the value of the input field
          .should('contain', input)  // Assert the value is the one you're expecting
          .then((text) => {
            cy.log("Extracted text: " + text);
          });
    }
    hoverFavoriteStarByNameAndValidateToolTip(name: string, expectedText?: string): void {
        const toolTipPath = `//*[text()='${name}']//parent::div//span[@sttooltip]//parent::div`
        this.hoverAndValidateTooltip(toolTipPath,expectedText)

    }
    clickCheckboxByName(name: string){
         const checkboxPath = `//*[text()='${name}']//ancestor::mat-checkbox//input`
         cy.xpath(checkboxPath).click()
    }

    validateItemAddToOrderList(name:string){
        this.getListOfTextsByXpath(this.orderListItems)
        .then((items) => {
            cy.log("All extracted texts:", JSON.stringify(items));
            const itemExists = items.some(item => item.trim() === name.trim());
            cy.log("Item Exists:", itemExists);
            expect(itemExists, `Expected "${name}" to be in ${JSON.stringify(items)}`).to.be.true;
        });
    }
    
    validateAndExtractOrderNumber() {
        const popupPath = "//*[contains(text(),'Order') and contains(text(),'saved')]";
        cy.log("Popup XPath:", popupPath); 
        this.getPopupMessage(popupPath).then((text: string) => {
            cy.log("Popup message:", text);
    
            // Ensure message contains 'Order' and 'saved'
            expect(text).to.include("Order");
            expect(text).to.include("saved");
    
            // Extract order number
            const orderNumberMatch = text.match(/Order (\w+)/);
            if (orderNumberMatch) {
                const orderNumber = orderNumberMatch[1];
                cy.log("Extracted Order Number:", orderNumber);
                Cypress.env("ORDER_NUMBER", orderNumber); // Save for later use
            } else {
                throw new Error("Order number not found in message");
            }
        });
    
    }

    interceptCreateOrder() {
        cy.intercept('POST', '/api/lab/order*').as('createOrder');
      }

    validateOrderResponseWithPopup() {
        cy.wait('@createOrder').then((interception) => {
          cy.log('🔹 Request:', interception.request.body);
      
          if (!interception.response) {
            throw new Error("No response received from the server.");
          }
      
          cy.log("🔹 Full Response Body:", JSON.stringify(interception.response.body, null, 2));
      
          const responseorderName = interception.response.body.order?.[0]?.orderName;
          cy.log(responseorderName)
          const extractedOrderNUMBER = Cypress.env("ORDER_NUMBER"); // Get from UI
      
          if (!responseorderName) {
            throw new Error("Order number is missing in the response.");
          }
      
      
          // Compare API order ID with extracted UI order ID
          expect(responseorderName).to.equal(extractedOrderNUMBER, "Response order ID should match UI popup order ID");
        });
      }
    
    clickSaveButton(){
        cy.get(this.saveButtonPath).click()
    }

    validateFiledsEmpty(){
        cy.xpath(this.getFieliedInputPath(OrderPage.FACILITY)).should('be.empty');
        cy.xpath(this.getFieliedInputPath(OrderPage.PATIENT)).should('be.empty');
        cy.xpath(this.getFieliedInputPath(OrderPage.PHYSICIAN)).should('be.empty');
    }
  }
  
  export default new OrderPage();
