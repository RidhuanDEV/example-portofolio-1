import sanitizeHtml from "sanitize-html";

interface RichTextRendererProps {
  html: string;
}

const allowedTags = [
  "p",
  "strong",
  "em",
  "code",
  "pre",
  "ul",
  "ol",
  "li",
  "h2",
  "h3",
  "h4",
  "blockquote",
  "a",
  "br",
] as const;

export function RichTextRenderer({ html }: RichTextRendererProps) {
  const clean = sanitizeHtml(html, {
    allowedTags: [...allowedTags],
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });

  return (
    <div
      className="prose prose-invert max-w-none prose-headings:font-sans prose-headings:font-semibold prose-headings:tracking-normal prose-p:text-zinc-300 prose-a:text-teal-200 prose-code:rounded prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-amber-100 prose-strong:text-white prose-li:text-zinc-300"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
