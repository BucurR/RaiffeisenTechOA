import { expect, Page } from "@playwright/test";
import BalanceDetailsTable, {
  relativeDateOption,
} from "./components/BalanceDetailsTable";

export default class BalanceDetailsPage {
  private page: Page;
  private balanceDetailsTable: BalanceDetailsTable;
  private iframeLocator = () => {
    return this.page.frameLocator('iframe[name="appFrame"]');
  };
  private balanceDetailsHeaderLocator = () => {
    return this.iframeLocator().getByRole("heading", {
      name: "Balance Details:",
    });
  };
  private exportBtnLocator = () => {
    return this.iframeLocator().locator(
      '[id="printExport:printExportForm:exportButton"]'
    );
  };
  constructor(page: Page) {
    this.page = page;
    this.balanceDetailsTable = new BalanceDetailsTable(page);
  }
  async startExport() {
    await this.exportBtnLocator().click();
  }
  async waitForDownloadEvent() {
    return this.page.waitForEvent("download");
  }
  async validateCorrectPage() {
    await expect(this.balanceDetailsHeaderLocator()).toBeVisible({
      timeout: 2 * 60 * 1000,
    });
  }
  /**
   * Applies a relative date filter on the page
   * @param option
   */
  async setRelativeDate(option: relativeDateOption) {
    await this.balanceDetailsTable.selectRelativeFilter(option);
  }
  /**
   * Sorts the table by date in ascending or descending order
   * @param desiredOrder
   */
  async sortTableByDate(desiredOrder: "ascending" | "descending") {
    await this.balanceDetailsTable.sortTableByDate(desiredOrder);
  }
  /**
   * Validates that filter was correctly applied to the table by comparing the oldest and newest entries and
   * making sure they fall in the specified interval
   * @param option - relative date filter that was applied
   */
  async validateTableSortedByRelativeDate(option: relativeDateOption) {
    await this.sortTableByDate("descending");
    const latestDate = await this.balanceDetailsTable.getFirstDateFromTable();
    await this.sortTableByDate("ascending");
    const oldestDate = await this.balanceDetailsTable.getFirstDateFromTable();
    const today = new Date();
    let expectedOldestDate: Date;
    switch (option) {
      case "Last 7 Days":
        expectedOldestDate = new Date(today);
        expectedOldestDate.setDate(today.getDate() - 7);
        break;
      case "Last 30 Days":
        expectedOldestDate = new Date(today);
        expectedOldestDate.setDate(today.getDate() - 30);
        break;
      case "Last 21 Days":
        expectedOldestDate = new Date(today);
        expectedOldestDate.setDate(today.getDate() - 21);
        break;
      default:
        throw new Error("Invalid filter option");
    }
    const expectedLatestDate = today;
    expect(oldestDate.getTime()).toBeGreaterThanOrEqual(
      expectedOldestDate.getTime()
    );
    expect(latestDate.getTime()).toBeLessThanOrEqual(
      expectedLatestDate.getTime()
    );
  }
}
