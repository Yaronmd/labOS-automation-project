import LoginPage from "@pages/LoginPage";
import { it } from "mocha";


describe("Login Functionality tests", () => {
    beforeEach(() => {
        LoginPage.visit();
      });

    it("should display warning messages when login is attempted without credentials",()=>{

        LoginPage.clickLogin()
        LoginPage.getListofWarningMessages().then((listOfWarnings) => {
          // Validate that the warning messages array matches the expected messages
          expect(listOfWarnings).to.deep.equal([
              "Username is required", 
              "Password is required"
          ]);
      });

    });
    it("should display error message when login is attempted with wrong credentials",()=>{

        LoginPage.login("123","123")
        LoginPage.getListofWarningMessages().then((listOfWarnings) => {
          // Validate that the warning messages array matches the expected messages
          expect(listOfWarnings).to.deep.equal([
              "Incorrect username or password. Please try again.", 
              
          ]);
      });

    });


    });



