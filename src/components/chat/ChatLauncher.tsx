"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { ChatSidebar } from "./ChatSidebar";

type Props = {
  cvId?: string;
};

export function ChatLauncher({ cvId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open AlmiCV Assistant chat"
        title="Ask AlmiCV Assistant"
        className={[
          "fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-coral text-white shadow-warm-card transition-all duration-200 hover:bg-coral-deep hover:shadow-warm-card-hover focus:outline-none focus:ring-4 focus:ring-coral/30",
          open ? "scale-90 opacity-0 pointer-events-none" : "scale-100 opacity-100",
        ].join(" ")}
      >
        <Sparkles className="h-5 w-5" />
        <span className="sr-only">Ask AlmiCV Assistant</span>
      </button>

      <ChatSidebar open={open} onClose={() => setOpen(false)} cvId={cvId} />
    </>
  );
}
