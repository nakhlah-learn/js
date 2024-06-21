"use client";

import type { CourseHeader, GroubLabel } from "@/server/types";
import type { ImperativePanelHandle } from "react-resizable-panels";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import Highlighter from "@/app/_components/highlighter";
import EditorSection from "@/app/_components/editor";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ResizeAreaProps {
  markdownContent: string;
  header: CourseHeader;
  dirLabel: GroubLabel | undefined;
}

export default function ResizeArea({
  markdownContent,
  header,
  dirLabel,
}: ResizeAreaProps) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("فتح المحرر");

  const contentRef = useRef<ImperativePanelHandle>(null);
  const editorRef = useRef<ImperativePanelHandle>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      if (contentRef.current) contentRef.current.resize(100);
      if (editorRef.current) editorRef.current.resize(0);
    } else {
      if (contentRef.current) contentRef.current.resize(50);
      if (editorRef.current) editorRef.current.resize(50);
    }
  }, [isSmallScreen]);

  const sectionSwitcherButton = () => {
    if (contentRef.current && editorRef.current) {
      if (editorRef.current.getSize() === 0) {
        setButtonLabel("فتح الدرس");
        editorRef.current.resize(100);
        contentRef.current.resize(0);
      } else {
        setButtonLabel("فتح المحرر");
        contentRef.current.resize(100);
        editorRef.current.resize(0);
      }
    }
  };

  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-none border"
      >
        <ResizablePanel ref={contentRef} defaultSize={50}>
          <div dir="ltr" className="h-full w-full overflow-auto">
            <div className="flex items-center px-2 py-2" dir="rtl">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink>
                      <Link href="/courses">الصفحة الرئيسية</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {dirLabel && (
                    <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink>
                          <Link href={`/courses/${dirLabel.lableSlug}`}>
                            {dirLabel.label}
                          </Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </>
                  )}
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{header.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
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
        <ResizablePanel ref={editorRef} defaultSize={50}>
          <EditorSection />
        </ResizablePanel>
      </ResizablePanelGroup>
      {isSmallScreen && (
        <Button
          onClick={sectionSwitcherButton}
          className="absolute bottom-2 right-2"
        >
          {buttonLabel}
        </Button>
      )}
    </>
  );
}
