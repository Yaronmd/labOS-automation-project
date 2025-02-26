import cypress = require("cypress");
import 'cypress-xpath';

class DashboardPage {

    private menuButtonPath = "#menu-button"
    private menuBarInputPath = "#menuSearchInput";
    
   clickMenuButton(){
    cy.get(this.menuButtonPath).click()
   }
   searchInMenuBar(input:string){
    cy.get(this.menuBarInputPath).type(input)
   }
   clickOnItemFromMenuBar(input:string){
    const temp = `//a//span[text()='${input}']`;
    cy.xpath(temp).click();
   }
   
   interactWithMenu(input: string) {
    this.clickMenuButton();          // Click the menu button
    this.searchInMenuBar(input);     // Search for input in the menu bar
    this.clickOnItemFromMenuBar(input); // Click the item in the menu bar
    }

  }
  
  export default new DashboardPage();
