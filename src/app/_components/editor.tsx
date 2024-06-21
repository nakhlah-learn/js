"use client";

import { useState } from "react";

import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function EditorSection() {
  const [codeString, setCodeString] = useState("console.log('hello world')");
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);

  function handleCodeRun() {
    try {
      const capturedOutput: string[] = [];
      const originalConsoleLog = console.log;
      console.log = (...args: any[]) => {
        capturedOutput.push(
          args
            .map((arg) => {
              if (typeof arg === "object" && arg !== null) {
                return JSON.stringify(arg);
              }
              return arg.toString();
            })
            .join(" "),
        );
        originalConsoleLog(...args);
      };
      eval(codeString);

      setIsError(false);
      if (capturedOutput.length > 0) {
        setOutput(capturedOutput.join("\n"));
      } else {
        setOutput("لا يوجد اي شيء يتم طباعته");
      }

      console.log = originalConsoleLog;
      return capturedOutput.join("\n");
    } catch (error: any) {
      setIsError(true);
      setOutput(`${error}`);
      return `${error}`;
    }
  }

  return (
    <div
      dir="ltr"
      className="flex h-full flex-col items-center justify-center bg-[#1E1E1E] pt-4"
    >
      <Editor
        defaultLanguage="javascript"
        defaultValue="console.log('hello world')"
        theme="vs-dark"
        value={codeString}
        onChange={(e) => {
          if (e) setCodeString(e);
        }}
      />
      <Separator />
      <div className="bg-background flex w-full gap-2 p-2">
        <Button
          onClick={() => setCodeString("")}
          variant="destructive"
          className="grow"
        >
          حذف
        </Button>
        <Button variant="outline" className="grow">
          اختبار
        </Button>
        <Button onClick={handleCodeRun} variant="outline" className="grow">
          تشغيل
        </Button>
      </div>
      <Separator />
      <div className="bg-background h-72 w-full overflow-auto p-2">
        <pre>
          <div
            className={
              "bg-background w-full font-mono text-sm " +
              (isError ? "text-red-500" : "text-white")
            }
          >
            {output}
          </div>
        </pre>
      </div>
    </div>
  );
}
