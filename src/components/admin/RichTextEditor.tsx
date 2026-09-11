"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Code, Heading3, Italic, List, ListOrdered, Quote } from "lucide-react";
import { useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-56 border border-white/10 bg-[#0c0e11] px-4 py-3 text-sm leading-7 text-zinc-100 outline-none",
      },
    },
    onUpdate({ editor: activeEditor }) {
      onChange(activeEditor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  const tools = [
    { label: "Bold", icon: Bold, action: () => editor?.chain().focus().toggleBold().run() },
    { label: "Italic", icon: Italic, action: () => editor?.chain().focus().toggleItalic().run() },
    { label: "Heading", icon: Heading3, action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run() },
    { label: "Bullet list", icon: List, action: () => editor?.chain().focus().toggleBulletList().run() },
    { label: "Ordered list", icon: ListOrdered, action: () => editor?.chain().focus().toggleOrderedList().run() },
    { label: "Quote", icon: Quote, action: () => editor?.chain().focus().toggleBlockquote().run() },
    { label: "Code", icon: Code, action: () => editor?.chain().focus().toggleCodeBlock().run() },
  ] as const;

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap gap-1">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.label}
              type="button"
              title={tool.label}
              onClick={tool.action}
              className="grid h-9 w-9 place-items-center border border-white/10 text-zinc-300 hover:border-teal-300/50 hover:text-teal-100"
            >
              <Icon size={15} />
            </button>
          );
        })}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
