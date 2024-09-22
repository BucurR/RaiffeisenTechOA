import { expect, Page } from "@playwright/test";

export default class BalanceDetailsPage {
  private page: Page;
  private balanceDetailsHeaderLocator = () => {
    return this.page
      .frameLocator('iframe[name="appFrame"]')
      .getByRole("heading", { name: "Balance Details:" });
  };
  constructor(page: Page) {
    this.page = page;
  }
  async validateCorrectPage() {
    await expect(this.balanceDetailsHeaderLocator()).toBeVisible({
      timeout: 2 * 60 * 1000,
    });
  }
}
