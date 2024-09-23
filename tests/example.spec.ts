import { test, expect } from "@playwright/test";
import { Given, When, Then } from "@cucumber/cucumber";
import { getRandomRelativeDateOption } from "../helpers/helpers";
import BalanceDetailsPage from "../pages/BalanceDetailsPage";
import BalancesPage from "../pages/BalancesPage";
import { relativeDateOption } from "../pages/components/BalanceDetailsTable";
import LoginPage from "../pages/LoginPage";
import PortalPage from "../pages/PortalPage";

test("has title", async ({ page }) => {
  let loginPage: LoginPage;
  let corporatePortalPage: PortalPage;
  let balancePage: BalancesPage;
  let balanceDetailsPage: BalanceDetailsPage;
  let selectedDate: relativeDateOption;
  loginPage = new LoginPage(page);
  await loginPage.doDemoLogin();
  corporatePortalPage = new PortalPage(page);
  balancePage = new BalancesPage(page);
  balanceDetailsPage = new BalanceDetailsPage(page);
  await corporatePortalPage.openInternetBanking();
  await balancePage.validateCorrectPage();
  await balancePage.selectAccountByIBAN("DE06 7002 0270 0865 2858 17");
  await balanceDetailsPage.validateCorrectPage();
  selectedDate = getRandomRelativeDateOption();

  await balanceDetailsPage.setRelativeDate(selectedDate);
  await balanceDetailsPage.validateTableSortedByRelativeDate(selectedDate);
});
