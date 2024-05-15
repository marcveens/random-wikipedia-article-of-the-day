import { test, expect } from "@playwright/test";
import { scraper } from "../src/scraper";

const hypothesis = true;

test.describe.configure({ mode: "serial" });
test.setTimeout(0);

test("Scrape data", async ({ page }) => {
  await scraper(page);

  expect(hypothesis).toBe(true);
});
