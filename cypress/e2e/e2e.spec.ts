import LoginPage from "@pages/LoginPage";
import DashboardPage from "@pages/DashboardPage";
import OrderPage from "@pages/OrderPage";
describe("E2E Tests", () => {
    before(() => {
        LoginPage.visit();
        LoginPage.login("qa", "123");  // You can also add assertion here to ensure successful login
        // Optionally, save the cookies or session data here if you need
        cy.url().should("include", "/dashboard");  // Ensure you're redirected to dashboard after login
      });

  it("Flow",()=>{
    // naviagte to Order and validate url
    DashboardPage.interactWithMenu("Order")
    cy.url().should("include","/order")

    // select Facility, Physician and Patient
    OrderPage.searchAndSelectFacility("QA Facility")
    OrderPage.validatePhysicianLoadedWithText("Dr. Hunter Atkinson (A98185)")
    OrderPage.searchAndSelectPatient("Qa Patient")

    
  });
 


});
