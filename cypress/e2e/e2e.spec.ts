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
    DashboardPage.interactWithMenu("Order")
    cy.url().should("include","/order")

    OrderPage.searchAndSelectFacility("QA Facility")
    OrderPage.validatePhysicianLoadedWithText("Dr. Hunter Atkinson (A98185)")

  });
 


});
