import LoginPage from "@pages/LoginPage";
import DashboardPage from "@pages/DashboardPage";
import OrderPage from "@pages/OrderPage";


describe("E2E Tests", () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.login("qa", "123");  // You can also add assertion here to ensure successful login
        // Optionally, save the cookies or session data here if you need
        cy.url().should("include", "/dashboard");  // Ensure you're redirected to dashboard after login
      });

  it("Order Creation and Validation",()=>{
    // naviagte to Order and validate url
    DashboardPage.interactWithMenu("Order")
    cy.url().should("include","/order")

    // select Facility, Physician and Patient
    OrderPage.validateFiledsEmpty()
    OrderPage.searchAndSelectFacility("QA Facility")
    OrderPage.validatePhysicianLoadedWithText("Dr. Hunter Atkinson (A98185)")
    OrderPage.searchAndSelectPatient("Qa Patient")
    OrderPage.validatePatientLoadedWithText("Qa Patient")
    OrderPage.hoverFavoriteStarByNameAndValidateToolTip("Albumin","SST")
    OrderPage.clickCheckboxByName("Albumin")
    OrderPage.validateItemAddToOrderList("109 - ALB")
    // listen to POST
    OrderPage.interceptCreateOrder()
    OrderPage.clickSaveButton()
    // Excrtact from UI
    OrderPage.validateAndExtractOrderNumber()
    // Valiate in response
    OrderPage.validateOrderResponseWithPopup()
    OrderPage.validateFiledsEmpty()
    

  });

  it("Validate missing fields in Order page",()=>{
    // naviagte to Order and validate url
    DashboardPage.interactWithMenu("Order")
    cy.url().should("include","/order")

    // select Facility, Physician and Patient
    OrderPage.validateFiledsEmpty()
    OrderPage.clickSaveButton()
    OrderPage.validateFiledsWarningHighliget()
    

  });
 


});
