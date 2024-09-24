import { expect, Page } from "@playwright/test";
import { parseCustomDate } from "../../helpers/helpers";


export  class BalanceDetailsTable {
  private page: Page;
  private iframeLocator = () => {
    return this.page.frameLocator('iframe[name="appFrame"]');
  };
  private valueDateTableHeaderLocator = () => {
    return this.iframeLocator().getByRole("columnheader", {
      name: "Value date",
    });
  };
  private balanceDateFilterBtnLocator = () => {
    return this.iframeLocator().locator(
      '[id="balance_details_fields:accountBalancesList:gridForm:dataGrid:filter_activator_balanceDate"]' //ugly ids..
    );
  };
  private relativeDateFilterLocator = () => {
    return this.iframeLocator().getByPlaceholder("No value selected");
  };
  private relativeDateOption = (option: relativeDateOption) => {
    return this.iframeLocator().getByRole("link", { name: option });
  };
  private applyFilterBtnLocator = () => {
    return this.iframeLocator().locator(
      '[id="balance_details_fields:accountBalancesList:gridForm:dataGrid:dgfc:BtnApply"]'
    );
  };
  private dateSortBtnLocator = () => {
    return this.iframeLocator().getByRole("link", { name: "Value date" });
  };
  constructor(page: Page) {
    this.page = page;
  }
  /**
   * Opens the Date Filter component
   */
  private async openDateFilter() {
    await this.valueDateTableHeaderLocator().hover();
    await expect(this.balanceDateFilterBtnLocator()).toBeVisible();
    await this.balanceDateFilterBtnLocator().click();
  }
  /**
   * Applies a relative date filter
   * @param option 
   */
  async selectRelativeFilter(option: relativeDateOption) {
    await this.openDateFilter();
    await expect(this.relativeDateFilterLocator()).toBeVisible();
    await this.relativeDateFilterLocator().click();
    await this.relativeDateOption(option).click();
    await this.applyFilterBtnLocator().click();
  }
  /**
   * Fetches the date value at the top of the table
   * @returns Date
   */
  async getFirstDateFromTable() {
    const firstDateTextVal = await this.iframeLocator()
      .getByRole("cell")
      .first()
      .textContent();
    const date = parseCustomDate(firstDateTextVal)
    return new Date(date);
  }
  /**
   * Sorts table by date in the desired order
   * @param desiredOrder 
   */
  async sortTableByDate(desiredOrder: "ascending" | "descending") {
    const currentClass = await this.dateSortBtnLocator().getAttribute("class");
    const isAscending = currentClass?.includes("ascending");
    const isDescending = currentClass?.includes("descending");
    if (desiredOrder === "ascending" && !isAscending) {
      await this.dateSortBtnLocator().click();
    } else if (desiredOrder === "descending" && !isDescending) {
      await this.dateSortBtnLocator().click();
    }
    await this.page.waitForTimeout(1500); //Allows time for table to refresh. Flaky and temporary, should probably validate by using the loading spinner transition but no time
    const newClass = await this.dateSortBtnLocator().getAttribute("class");
    if (desiredOrder === "ascending" && !newClass?.includes("ascending")) {
      throw new Error("Failed to sort in ascending order");
    }
    if (desiredOrder === "descending" && !newClass?.includes("descending")) {
      throw new Error("Failed to sort in descending order");
    }
  }
}
export enum relativeDateOption {
  LAST_7_Days = "Last 7 Days",
  LAST_21_Days = "Last 21 Days",
  LAST_30_DAYS = "Last 30 Days",
}
