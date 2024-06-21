"use client";

import { useEffect } from "react";
import hljs from "highlight.js";

export default function Highlighter() {
  // Trigger highlight.js after the content has been loaded
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return null;
}
