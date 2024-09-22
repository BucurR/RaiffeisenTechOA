import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "./base";
import LoginPage from "../../../pages/LoginPage";
import PortalPage from "../../../pages/PortalPage";
import BalancesPage from "../../../pages/BalancesPage";
import BalanceDetailsPage from "../../../pages/BalanceDetailsPage";

let loginPage:LoginPage
let corporatePortalPage: PortalPage
let balancePage:BalancesPage
let balanceDetailsPage:BalanceDetailsPage
Given("User logs into the application", async function () {
  loginPage = new LoginPage(page)
  await loginPage.doDemoLogin()
});

Given("User navigates to the Balance Details View", async function () {
  corporatePortalPage=new PortalPage(page)
  balancePage = new BalancesPage(page)
  balanceDetailsPage = new BalanceDetailsPage(page)
  await corporatePortalPage.openInternetBanking()
  await balancePage.validateCorrectPage()
  await balancePage.selectAccountByIBAN("DE06 7002 0270 0865 2858 17")
  await balanceDetailsPage.validateCorrectPage()
});

Given("User hovers over {string}", async function (string) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Given("User clicks on the filter icon that appears", async function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

When("User selects relative filtering", async function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

When("User picks up an option from the drop down list", async function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

When("User clicks apply", async function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then("Table is updated based on the selected values", async function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});
