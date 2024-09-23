import { relativeDateOption } from "../pages/components/BalanceDetailsTable";
/**
 * Selects a relative filter option for dates
 * @returns relativeDateOption
 */
export function getRandomRelativeDateOption(): relativeDateOption {
  const values = Object.values(relativeDateOption);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex] as relativeDateOption;
}
/**
 * Parses the dates found in the tables
 * @param dateString date in dd/mm/yy format
 * @returns a new Date object
 */
export function parseCustomDate(dateString: string): Date {
  const [day, month, year] = dateString.split("/").map(Number);
  const fullYear = year + 2000;
  return new Date(fullYear, month - 1, day);
}
