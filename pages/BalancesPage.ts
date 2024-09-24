import { expect, Page } from "@playwright/test";

export  class BalancesPage {
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
  /**
   * Opens the Balance Details tab for specified account
   * @param iban 
   */
  async selectAccountByIBAN(iban:string){
    await this.accountRowLocatorByIBAN(iban).click()
  }
}
