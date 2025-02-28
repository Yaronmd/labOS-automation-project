import cypress = require("cypress");
import 'cypress-xpath';
import BasePage from "./BasePage";

class LoginPage extends BasePage{
    private baseUrl = "https://qa-candidates.labos.cloud/2/login"

    private commonInputPath = "//form//mat-form-field"
    private loginButton = "#st-button-login-enter";
 
    
    visit() {
      cy.visit(this.baseUrl);
    }
  
    enterUsername(username: string) {
        cy.xpath(this.commonInputPath).eq(0).type(username)
    }
  
    enterPassword(password: string) {
        cy.xpath(this.commonInputPath).eq(1).type(password)

    }
  
    clickLogin() {
      cy.get(this.loginButton).click();
    }
  
    login(username: string, password: string) {
      this.enterUsername(username);
      this.enterPassword(password);
      this.clickLogin();
    }

 
  }
  
  export default new LoginPage();
  