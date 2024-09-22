import { Page } from "@playwright/test";

export class DemoLoginIframe {
  private page: Page;
  private loginBtnLocator = () => {
    return this.page
      .frameLocator('iframe[name="loginIFrame"]')
      .getByRole("button", { name: "Login" });
  };
  constructor(page: Page) {
    this.page = page;
  }
  async clickLoginBtn(){
    await this.loginBtnLocator().click()
  }
}
