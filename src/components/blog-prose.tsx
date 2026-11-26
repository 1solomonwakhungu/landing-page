import * as React from "react";
import { SurfaceTile } from "@/components/tonal/surface-tile";
import { BlogCodeBlock } from "@/components/blog-code-block";
import { BlogDiagram } from "@/components/blog-diagrams";
import type { BlogBlock } from "@/data/blog";

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

export function BlogProse({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="tonal-prose flex flex-col">
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p key={index} className="text-[16px] leading-[1.78]">
              {renderInline(block.text)}
            </p>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={index} className="my-3">
              {block.items.map((item, i) => (
                <li key={i}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "ol") {
          return (
            <ol key={index} className="my-3">
              {block.items.map((item, i) => (
                <li key={i}>{renderInline(item)}</li>
              ))}
            </ol>
          );
        }
        if (block.type === "code") {
          return (
            <BlogCodeBlock
              key={index}
              code={block.code}
              label={block.label}
            />
          );
        }
        if (block.type === "callout") {
          return (
            <SurfaceTile
              key={index}
              tone={block.tone ?? "warm"}
              padding="sm"
              className="my-5"
            >
              {block.title && (
                <div className="mb-1.5 text-[12px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
                  {block.title}
                </div>
              )}
              <p className="text-[14.5px] leading-[1.68] text-[var(--t-ink-secondary)]">
                {renderInline(block.text)}
              </p>
            </SurfaceTile>
          );
        }
        if (block.type === "diagram") {
          return <BlogDiagram key={index} id={block.diagramId} />;
        }
        return null;
      })}
    </div>
  );
}
