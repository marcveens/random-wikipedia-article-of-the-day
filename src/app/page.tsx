import { WikiRecord } from "@/types/WikiRecord";
import fs from "fs";
import path from "path";

export default function Home() {
  const rawList = fs.readFileSync(path.resolve("src/data/db.json"), "utf8");
  let list = JSON.parse(rawList) as WikiRecord[];

  list = list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="mx-auto flex max-w-[600px] flex-col items-center justify-between px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Random Wiki Articles</h1>
        <div className="flex items-center justify-center gap-2">
          <a
            href="https://github.com/marcveens/random-wikipedia-article-of-the-day"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 underline hover:text-violet-300"
          >
            Source
          </a>
          <span>&#8226;</span>
          <a
            href="https://www.marcveens.nl/posts/scheduled-data-scraping-made-easy-using-playwright-with-github-actions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 underline hover:text-violet-300"
          >
            Blog post
          </a>
        </div>
      </div>

      <div className="flex w-full flex-col gap-8">
        {list.map((record) => {
          const formattedDate = new Date(record.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          });

          return (
            <div key={record.date}>
              <p className="text-sm text-gray-400">{formattedDate}</p>
              <a
                href={record.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-2 transition-colors duration-200 hover:text-violet-300"
              >
                <h2 className="text-2xl font-semibold">{record.title}</h2>
              </a>
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-200">{record.summary}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
