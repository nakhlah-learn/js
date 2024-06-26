import "@/styles/github-markdown-dark.css";
import "@/styles/github-markdown.css";

import { parseMarkdownFromFile } from "@/server/markdownParser";

import ResizeArea from "@/app/_components/resize-area";

interface Props {
  params: { slug: string[] };
}

export default async function HomePage({ params }: Props) {
  // TODO: handle if file not found will raise error
  // return 404

  const [markdownContent, header, dirLabel] = await parseMarkdownFromFile(
    params.slug.join("/"),
  );

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/highlightjs-themes@1.0.0/androidstudio.css"
      />
      <main className="h-full-minus-bar">
        <ResizeArea
          markdownContent={markdownContent}
          header={header}
          dirLabel={dirLabel}
        />
      </main>
    </>
  );
}
