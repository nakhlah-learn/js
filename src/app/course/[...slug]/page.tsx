import "@/styles/github-markdown-dark.css";
import "@/styles/github-markdown.css";

import { parseMarkdownFromFile } from "@/server/markdownParser";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Separator } from "@/components/ui/separator";
import Highlighter from "@/app/_components/highlighter";
import EditorSection from "@/app/_components/editor";

interface Props {
  params: { slug: string[] };
}

export default async function HomePage({ params }: Props) {
  const [markdownContent, header] = await parseMarkdownFromFile(
    params.slug.join("/"),
  );

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/highlightjs-themes@1.0.0/androidstudio.css"
      />
      <main className="h-full-minus-bar">
        <ResizablePanelGroup
          direction="horizontal"
          className="rounded-none border"
        >
          <ResizablePanel defaultSize={60}>
            <div dir="ltr" className="h-full w-full overflow-auto">
              <div className="w-full px-2 pt-2" dir="rtl">
                <Link href="/courses">
                  <Button className="mb-2" variant="outline">
                    الرجوع
                  </Button>
                </Link>
              </div>
              <Separator className="h-[2px]" />
              <div dir="rtl" className="p-4">
                <h1 className="mb-2 text-2xl font-semibold">{header.title}</h1>
                <div
                  className="markdown-body"
                  dangerouslySetInnerHTML={{ __html: markdownContent }}
                />
              </div>
            </div>
            <Highlighter />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={40}>
            <EditorSection />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </>
  );
}
