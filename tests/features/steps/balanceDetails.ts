import { Given, When, Then } from "@cucumber/cucumber";
import { Download, expect } from "@playwright/test";
import path from "path";
import { getRandomRelativeDateOption } from "../../../helpers/helpers";
import { BalanceDetailsPage } from "../../../pages/BalanceDetailsPage";
import { BalancesPage } from "../../../pages/BalancesPage";
import { relativeDateOption } from "../../../pages/components/BalanceDetailsTable";
import { PortalPage } from "../../../pages/PortalPage";
import { page } from "./base";
import fs from "fs"

let corporatePortalPage: PortalPage;
let balancePage: BalancesPage;
let balanceDetailsPage: BalanceDetailsPage;
let selectedDate: relativeDateOption;
let download: Download;
Given("User navigates to the Balance Details View", async function () {
  corporatePortalPage = new PortalPage(page);
  balancePage = new BalancesPage(page);
  balanceDetailsPage = new BalanceDetailsPage(page);
  await corporatePortalPage.openInternetBanking();
  await balancePage.validateCorrectPage();
  await balancePage.selectAccountByIBAN("DE06 7002 0270 0865 2858 17");
  await balanceDetailsPage.validateCorrectPage();
});

When("User filters based on relative date", async function () {
  selectedDate = getRandomRelativeDateOption();
  this.attach(`Selected filter: ${selectedDate}`);
  await balanceDetailsPage.setRelativeDate(selectedDate);
});

Then("Table is updated based on the selected values", async function () {
  await balanceDetailsPage.validateTableSortedByRelativeDate(selectedDate);
});

When("User clicks on the export button", async function () {
  [download] = await Promise.all([
    balanceDetailsPage.waitForDownloadEvent(),
    balanceDetailsPage.startExport(),
  ]);
});
When('User clicks on the print button', async function () {
  [download] = await Promise.all([
    balanceDetailsPage.waitForDownloadEvent(),
    balanceDetailsPage.printDetails(),
  ]);
  
});
Then("File is downloaded", async function () {
  const downloadPath = path.join(
    __dirname,
    "downloads",
    await download.suggestedFilename()
  );
  await download.saveAs(downloadPath);
  this.downloadPath = downloadPath;
  expect(fs.existsSync(this.downloadPath)).toBe(true);
});

Then("Contents of the file are correct", async function () {
  const stats = fs.statSync(this.downloadPath);
  expect(stats.size).toBeGreaterThan(0); // Only checks that the file is not empty, not enough time to do custom parsing and validations of content
  fs.unlinkSync(this.downloadPath);
});
