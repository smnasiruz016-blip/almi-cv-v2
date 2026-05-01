"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, Underline as UnderlineIcon } from "lucide-react";
import { useEffect } from "react";
import { sanitizeRichText } from "@/lib/rich-text";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
  ariaLabel?: string;
};

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  minHeight = 80,
  ariaLabel,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      Underline,
      Placeholder.configure({
        placeholder: placeholder ?? "",
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: sanitizeRichText(value ?? ""),
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "rich-editor-content",
        ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html === "<p></p>" ? "" : html);
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const incoming = sanitizeRichText(value ?? "");
    const incomingNormalized = incoming === "" ? "<p></p>" : incoming;
    // TODO(diag): temporary — remove once we've captured the failure mode
    console.log("[RTE] sync", {
      current,
      incoming: incomingNormalized,
      willUpdate: current !== incomingNormalized,
    });
    if (current !== incomingNormalized) {
      editor.commands.setContent(incoming, { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div
        className="w-full rounded-md border border-plum/15 bg-cream-soft"
        style={{ minHeight: minHeight + 40 }}
      />
    );
  }

  const btn = (active: boolean) =>
    `inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
      active ? "bg-plum/10 text-plum" : "text-plum-soft hover:bg-cream-soft"
    }`;

  return (
    <div
      className="w-full rounded-md border border-plum/15 bg-cream-soft transition-colors focus-within:border-coral focus-within:ring-2 focus-within:ring-coral/20"
      style={{ ["--min-height" as string]: `${minHeight}px` }}
    >
      <div className="flex items-center gap-1 border-b border-plum/10 px-2 py-1">
        <button
          type="button"
          aria-label="Bold (Ctrl+B)"
          aria-pressed={editor.isActive("bold")}
          className={btn(editor.isActive("bold"))}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label="Italic (Ctrl+I)"
          aria-pressed={editor.isActive("italic")}
          className={btn(editor.isActive("italic"))}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label="Underline (Ctrl+U)"
          aria-pressed={editor.isActive("underline")}
          className={btn(editor.isActive("underline"))}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="p-3 text-sm leading-relaxed text-plum">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
