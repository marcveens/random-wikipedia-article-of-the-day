import { WikiRecord } from "@/types/WikiRecord";
import { Page } from "@playwright/test";

export const getRandomWikiArticle = async (page: Page): Promise<WikiRecord> => {
  await page.goto("https://en.wikipedia.org/wiki/Special:Random");

  const title = await page.innerText("h1");
  const summary = await page.innerText("#mw-content-text p");

  return {
    date: new Date().toISOString(),
    title,
    url: page.url(),
    summary,
  };
};
