import { expect, Page } from "@playwright/test";
import { CookiesIframe } from "@components/CookiesIframe";
import { DemoLoginIframe } from "@components/DemoLoginFrame";

export default class LoginPage {
  private page: Page;
  private cookiesModal: CookiesIframe;
  private demoLoginFrame: DemoLoginIframe;
  private url =
    "https://corporateportal.unicreditgroup.eu/portal/germany/login";
  private loginDropdown = () => {
    return this.page.locator(".login-dropdown");
  };
  private loginOption = (option: loginOptions) => {
    return this.page.getByRole("link", { name: option });
  };
  private continueBtnLocator = () => {
    return this.page.getByRole("button", { name: "Continue" });
  };
  private yourServicesHeaderLocator(){
    return this.page.frameLocator('iframe[name="appFrame"]').getByText('Your services', { exact: true })
  }
  constructor(page: Page) {
    this.page = page;
    this.cookiesModal = new CookiesIframe(page);
    this.demoLoginFrame = new DemoLoginIframe(page);
  }
  private async goToLoginPage() {
    await this.page.goto(this.url);
    expect(this.page).toHaveURL(this.url);
  }
  private async selectLoginOption(option: loginOptions) {
    await this.loginDropdown().click();
    await this.loginOption(option).click();
  }
  /**
   * Logs into the Demo app
   */
  async doDemoLogin() {
    await this.goToLoginPage();
    await this.cookiesModal.closeCookiesModal();
    await this.selectLoginOption(loginOptions.Demo);
    await this.demoLoginFrame.clickLoginBtn();
    await this.continueBtnLocator().click()
    await expect(this.yourServicesHeaderLocator()).toBeVisible({timeout:2*60*1000})
  }
}
enum loginOptions {
  Demo = "Demo Login",
  BankingNumber = "Direct Banking Number (PayGate)",
  photoTAN = "photoTAN",
  mobileToken = "UC Mobile Token",
}
