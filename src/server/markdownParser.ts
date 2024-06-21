import type { CourseHeader } from "./types";

import fs from "fs-extra";
import path from "path";

import matter from "gray-matter";
import { remark } from "remark";

import gfm from "remark-gfm";
import html from "remark-html";
import remarkHighlight from "remark-highlight.js";

export async function parseMarkdownFromFile(
  filePath: string,
): Promise<[string, CourseHeader]> {
  // Read the markdown file content
  const markdownFileContent = await fs.readFile(
    path.join(process.cwd(), "courses", `${filePath}.md`),
    "utf-8",
  );

  // Extract front matter from the markdown content
  const { content: markdownContent, data } = matter(markdownFileContent);

  // Process the markdown content without front matter
  const result = await remark()
    .use(remarkHighlight as any) // Enable syntax highlighting
    .use(html) // Convert it to HTML
    .use(gfm) // Enable GitHub Flavored Markdown
    .process(markdownContent);

  return [result.toString(), data as CourseHeader];
}
