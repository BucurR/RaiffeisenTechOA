import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";


let browser: Browser;
let browserCtxt: BrowserContext;
let page: Page;
let loginPage: LoginPage;
setDefaultTimeout(1000*60*5)
Before(async function () {
  browser = await chromium.launch({ headless: false });
  browserCtxt = await browser.newContext();
  page = await browserCtxt.newPage();
  loginPage = new LoginPage(page);
  await loginPage.doDemoLogin();
});
After(async function () {
  await page.close();
  await browserCtxt.close();
  await browser.close();
});
export { page };
