import { expect, Page } from "@playwright/test";

export default class BalancesPage {
  private page: Page;
  private pageHeaderLocator = () => {
    return this.page
      .frameLocator('iframe[name="appFrame"]')
      .getByRole("heading", { name: "Balances", exact: true });
  };
  private accountRowLocatorByIBAN= (iban:string)=>{
    return this.page.frameLocator('iframe[name="appFrame"]').locator('[data-column-name="IBAN"]',{hasText:iban})
  }
  constructor(page: Page) {
    this.page = page;
  }

  async validateCorrectPage() {
    await expect(this.pageHeaderLocator()).toBeVisible({
      timeout: 2 * 60 * 1000,
    });
  }
  async selectAccountByIBAN(iban:string){
    await this.accountRowLocatorByIBAN(iban).click()
  }
}
