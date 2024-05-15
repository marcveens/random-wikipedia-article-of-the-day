import { WikiRecord } from "@/types/WikiRecord";
import fs from "fs";
import path from "path";

export default function Home() {
  const rawList = fs.readFileSync(path.resolve("src/data/db.json"), "utf8");
  let list = JSON.parse(rawList) as WikiRecord[];

  list = list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="mx-auto flex min-h-screen max-w-[600px] flex-col items-center justify-between px-4 py-12">
      <h1 className="mb-10 text-4xl font-bold">Random Wiki Articles</h1>

      <div className="flex w-full flex-col gap-8">
        {list.map((record) => {
          const formattedDate = new Date(record.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          });

          return (
            <div key={record.date}>
              <p className="text-sm text-gray-500">{formattedDate}</p>
              <a
                href={record.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-2 hover:text-violet-600 transition-colors duration-200"
              >
                <h2 className="text-2xl font-semibold">{record.title}</h2>
              </a>
              <p className="overflow-hidden text-ellipsis whitespace-nowrap">{record.summary}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
