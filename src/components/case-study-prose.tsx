import * as React from "react";
import type { CaseStudyBlock } from "@/data/case-studies";

function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={idx}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

export function CaseStudyProse({ blocks }: { blocks: CaseStudyBlock[] }) {
  return (
    <div className="tonal-prose">
      {blocks.map((block, index) => {
        if (block.type === "paragraph" && block.text) {
          return <p key={index}>{renderInline(block.text)}</p>;
        }
        if (block.type === "ul" && block.items) {
          return (
            <ul key={index}>
              {block.items.map((item, i) => (
                <li key={i}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "ol" && block.items) {
          return (
            <ol key={index}>
              {block.items.map((item, i) => (
                <li key={i}>{renderInline(item)}</li>
              ))}
            </ol>
          );
        }
        if (block.type === "code" && block.text) {
          return (
            <pre key={index}>
              <code>{block.text}</code>
            </pre>
          );
        }
        return null;
      })}
    </div>
  );
}
