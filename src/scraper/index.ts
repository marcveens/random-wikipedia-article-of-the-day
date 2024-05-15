import fs from "fs";
import path from "path";
import { WikiRecord } from "@/types/WikiRecord";
import { Page } from "@playwright/test";
import db from "@/data/db.json";
import { getRandomWikiArticle } from "./wiki";

export const scraper = async (page: Page) => {
  let list: WikiRecord[] = db || [];

  const article = await getRandomWikiArticle(page);

  list = [article, ...list];

  // Store file
  const data = JSON.stringify(list, null, 2);
  const filePath = path.join(__dirname, "..", "data", "db.json");

  fs.writeFileSync(filePath, data);


  return list;
};
