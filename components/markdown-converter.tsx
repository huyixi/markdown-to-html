"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { marked } from "marked";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const INITIAL_MARKDOWN = `# Welcome to Markdown Converter

This is a **powerful** markdown to HTML converter built with Next.js.

## Features

- Real-time conversion
- Dual-pane layout
- Preview and code view
- Copy to clipboard

### Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

### Lists

- Item 1
- Item 2
- Item 3

### Links

[Visit Next.js](https://nextjs.org)

> This is a blockquote
`;

const SAMPLE_MARKDOWN = `# Sample Document

## Introduction

This is a sample markdown document with various elements.

### Text Formatting

You can make text **bold**, *italic*, or ***both***.

### Code

Inline code: \`const x = 10;\`

Block code:

\`\`\`typescript
interface User {
  name: string;
  email: string;
}
\`\`\`

### Lists

Ordered list:
1. First item
2. Second item
3. Third item

Unordered list:
- Apple
- Banana
- Orange

### Links and Images

[Next.js Documentation](https://nextjs.org/docs)

### Blockquotes

> "The best way to predict the future is to invent it."
> - Alan Kay

### Tables

| Feature | Status |
|---------|--------|
| Preview | ✅ |
| Export  | ✅ |
| Share   | ✅ |
`;

export default function MarkdownConverter() {
  const [markdown, setMarkdown] = useState(INITIAL_MARKDOWN);
  const [copied, setCopied] = useState(false);
  const [htmlCopied, setHtmlCopied] = useState(false);
  const [leftWidth, setLeftWidth] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("preview");

  const htmlOutput = useMemo(() => {
    try {
      return marked(markdown);
    } catch (error) {
      return '<p class="text-destructive">Error parsing markdown</p>';
    }
  }, [markdown]);

  const clearMarkdown = () => {
    setMarkdown("");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(htmlOutput);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const copyHtmlOutput = async () => {
    try {
      await navigator.clipboard.writeText(htmlOutput);
      setHtmlCopied(true);
      setTimeout(() => {
        setHtmlCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;

      // Constrain between 20% and 80%
      if (newLeftWidth >= 20 && newLeftWidth <= 80) {
        setLeftWidth(newLeftWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div ref={containerRef} className="flex h-[calc(100vh-80px)] select-none">
      {/* Left Panel - Markdown Input */}
      <div className="flex flex-col" style={{ width: `${leftWidth}%` }}>
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Markdown Input</h2>
          <Button size="sm" variant="outline" onClick={clearMarkdown}>
            Clear
          </Button>
        </div>
        <div className="flex-1 overflow-hidden p-4">
          <Textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Enter your markdown here..."
            className="font-mono text-sm h-full resize-none"
          />
        </div>
      </div>

      <div
        className="w-1 bg-border hover:bg-primary cursor-col-resize transition-colors"
        onMouseDown={handleMouseDown}
      />

      {/* Right Panel - HTML Output */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Output</h2>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="h-8"
            >
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="html">HTML Code</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <Button size="sm" onClick={copyHtmlOutput}>
            {htmlCopied ? "Copied!" : "Copy HTML"}
          </Button>
        </div>
        <div className="flex-1 overflow-hidden p-4">
          {activeTab === "preview" && (
            <div className="h-full overflow-auto">
              <div
                className="prose prose-invert max-w-none p-4"
                dangerouslySetInnerHTML={{ __html: htmlOutput }}
              />
            </div>
          )}
          {activeTab === "html" && (
            <div className="h-full flex flex-col">
              <Textarea
                value={htmlOutput}
                readOnly
                className="font-mono text-sm flex-1 resize-none"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
