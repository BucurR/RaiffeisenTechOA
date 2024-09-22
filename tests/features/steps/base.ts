import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "@playwright/test";

let browser: Browser;
let browserCtxt: BrowserContext;
let page: Page;
setDefaultTimeout(1000*60*5)
Before(async function () {
  browser = await chromium.launch({ headless: false });
  browserCtxt = await browser.newContext();
  page = await browserCtxt.newPage();
});
After(async function () {
  await page.close();
  await browserCtxt.close();
  await browser.close();
});
export { page };
