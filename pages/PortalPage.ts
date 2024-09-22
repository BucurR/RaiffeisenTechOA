import { Page } from "@playwright/test";

export default class PortalPage {
  private page: Page;
  private internetBankingBtnLocator = () => {
    return this.page
      .frameLocator('iframe[name="appFrame"]')
      .getByRole("button", { name: "Internet Banking UC eBanking" });
  };
  constructor(page: Page) {
    this.page = page;
  }

  async openInternetBanking() {
    await this.internetBankingBtnLocator().click();
  }
}

