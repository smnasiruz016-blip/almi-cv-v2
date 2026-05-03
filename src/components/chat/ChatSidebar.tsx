"use client";

import { useEffect, useRef, useState } from "react";
import {
  Loader2,
  Send,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  clearChatHistory,
  getChatHistory,
  sendChatMessage,
  type ChatMessageDTO,
} from "@/lib/ai/chat";

const MAX_MESSAGE = 2000;
const FALLBACK_ERROR = "Something went wrong — try again";

const STARTER_PROMPTS_WITH_CV: string[] = [
  "How can I improve my CV?",
  "What skills should I highlight?",
  "Help me rewrite my summary",
  "What's missing from my CV?",
];

const STARTER_PROMPTS_GENERIC: string[] = [
  "How do I write a strong CV summary?",
  "What action verbs should I use in bullets?",
  "How long should my CV be?",
  "Tips for my next interview",
];

type Props = {
  open: boolean;
  onClose: () => void;
  cvId?: string;
};

const ASSISTANT_MD_COMPONENTS = {
  // Strict allowlist — no images, no raw HTML. ReactMarkdown ignores raw
  // HTML by default; we explicitly null out media-style elements just in
  // case the model emits them.
  img: () => null,
  iframe: () => null,
  script: () => null,
  // Style the renderable subset to fit the cream/plum palette
  p: (props: { children?: React.ReactNode }) => (
    <p className="mb-2 last:mb-0 leading-relaxed">{props.children}</p>
  ),
  ul: (props: { children?: React.ReactNode }) => (
    <ul className="mb-2 ml-4 list-disc space-y-1 last:mb-0">{props.children}</ul>
  ),
  ol: (props: { children?: React.ReactNode }) => (
    <ol className="mb-2 ml-5 list-decimal space-y-1 last:mb-0">{props.children}</ol>
  ),
  li: (props: { children?: React.ReactNode }) => (
    <li className="leading-relaxed">{props.children}</li>
  ),
  strong: (props: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-plum">{props.children}</strong>
  ),
  em: (props: { children?: React.ReactNode }) => (
    <em className="italic">{props.children}</em>
  ),
  h1: (props: { children?: React.ReactNode }) => (
    <h3 className="mb-1 mt-2 text-sm font-semibold text-plum first:mt-0">{props.children}</h3>
  ),
  h2: (props: { children?: React.ReactNode }) => (
    <h3 className="mb-1 mt-2 text-sm font-semibold text-plum first:mt-0">{props.children}</h3>
  ),
  h3: (props: { children?: React.ReactNode }) => (
    <h3 className="mb-1 mt-2 text-sm font-semibold text-plum first:mt-0">{props.children}</h3>
  ),
  code: (props: { children?: React.ReactNode }) => (
    <code className="rounded bg-plum/10 px-1 py-0.5 font-mono text-[12px] text-plum">{props.children}</code>
  ),
  a: (props: { href?: string; children?: React.ReactNode }) => (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-coral-deep underline underline-offset-2 hover:text-coral"
    >
      {props.children}
    </a>
  ),
};

function AssistantMarkdown({ content }: { content: string }) {
  return (
    <div className="text-sm text-plum">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        components={ASSISTANT_MD_COMPONENTS}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function MessageBubble({ msg }: { msg: ChatMessageDTO }) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-coral px-3.5 py-2.5 text-sm leading-relaxed text-white">
          <p className="whitespace-pre-wrap break-words">{msg.content}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-cream-soft px-3.5 py-2.5">
        <AssistantMarkdown content={msg.content} />
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl rounded-tl-md bg-cream-soft px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-plum-soft [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-plum-soft [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-plum-soft" />
        </div>
      </div>
    </div>
  );
}

export function ChatSidebar({ open, onClose, cvId }: Props) {
  const [messages, setMessages] = useState<ChatMessageDTO[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const requestId = useRef(0);

  // Load history on first open (per cvId scope)
  useEffect(() => {
    if (!open || historyLoaded) return;
    let cancelled = false;
    setLoadingHistory(true);
    void (async () => {
      try {
        const r = await getChatHistory(cvId);
        if (cancelled) return;
        if (r.ok) {
          setMessages(r.messages);
        }
      } catch (err) {
        console.error("[ChatSidebar] load history failed:", err);
      } finally {
        if (!cancelled) {
          setLoadingHistory(false);
          setHistoryLoaded(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, historyLoaded, cvId]);

  // Reset historyLoaded when cvId changes so we refetch for the new scope
  useEffect(() => {
    setHistoryLoaded(false);
    setMessages([]);
  }, [cvId]);

  // Auto-scroll to bottom on new message / loading
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, sending, loadingHistory]);

  // Auto-grow textarea up to ~5 rows
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [input]);

  // Focus input when opening
  useEffect(() => {
    if (open) {
      // Defer to next tick so the slide-in transition doesn't fight focus
      const t = setTimeout(() => textareaRef.current?.focus(), 320);
      return () => clearTimeout(t);
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const trimmed = input.trim();
  const canSend = trimmed.length > 0 && trimmed.length <= MAX_MESSAGE && !sending;

  const handleSend = async () => {
    if (!canSend) return;
    const myId = ++requestId.current;
    const text = trimmed;

    // Optimistic user bubble
    const tempUser: ChatMessageDTO = {
      id: `temp-${Date.now()}`,
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUser]);
    setInput("");
    setError(null);
    setSending(true);

    try {
      const r = await sendChatMessage({ cvId, message: text });
      if (myId !== requestId.current) return;
      if (!r.ok) {
        setError(r.error || FALLBACK_ERROR);
        // Roll back optimistic bubble — let user retry
        setMessages((prev) => prev.filter((m) => m.id !== tempUser.id));
        setInput(text);
        return;
      }
      const reply: ChatMessageDTO = {
        id: r.messageId,
        role: "assistant",
        content: r.reply,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      if (myId !== requestId.current) return;
      console.error("[ChatSidebar] send failed:", err);
      setError(FALLBACK_ERROR);
      setMessages((prev) => prev.filter((m) => m.id !== tempUser.id));
      setInput(text);
    } finally {
      if (myId === requestId.current) setSending(false);
    }
  };

  const handleClear = async () => {
    if (messages.length === 0) return;
    const ok = window.confirm(
      "Clear this chat? This deletes all messages in the current scope.",
    );
    if (!ok) return;
    requestId.current++;
    setMessages([]);
    setError(null);
    setInput("");
    try {
      const r = await clearChatHistory(cvId);
      if (!r.ok) {
        setError(r.error || "Couldn't clear chat");
      }
    } catch (err) {
      console.error("[ChatSidebar] clear failed:", err);
      setError("Couldn't clear chat");
    }
  };

  const handleStarter = (prompt: string) => {
    setInput(prompt);
    // Defer focus so textarea reflects the new value first
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  const showEmptyState =
    !loadingHistory && messages.length === 0 && !sending;
  const starters = cvId ? STARTER_PROMPTS_WITH_CV : STARTER_PROMPTS_GENERIC;

  return (
    <>
      {/* Mobile-only backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={[
          "fixed inset-0 z-40 bg-plum/40 transition-opacity duration-300 sm:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      />

      <aside
        role="dialog"
        aria-label="AlmiCV Assistant chat"
        aria-hidden={!open}
        className={[
          "fixed right-0 top-0 z-50 flex h-full w-full flex-col border-l border-plum/15 bg-white shadow-2xl transition-transform duration-300 ease-in-out sm:w-[400px]",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b border-plum/10 bg-cream-soft px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-coral">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-plum">
                AlmiCV Assistant
              </p>
              <p className="truncate text-[11px] text-plum-faint">
                {cvId ? "Knows your CV" : "General career help"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => void handleClear()}
              disabled={sending || messages.length === 0}
              aria-label="Clear chat"
              title="Clear chat"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-plum-soft transition-colors hover:bg-coral/10 hover:text-coral disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close chat"
              title="Close (Esc)"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-plum-soft transition-colors hover:bg-plum/10 hover:text-plum"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4"
        >
          {error && (
            <div
              role="alert"
              className="mb-3 rounded-md border border-coral/30 bg-coral-soft/40 px-3 py-2 text-xs text-coral-deep"
            >
              {error}
            </div>
          )}

          {loadingHistory && (
            <div className="flex items-center justify-center py-6 text-xs text-plum-faint">
              <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
              Loading conversation...
            </div>
          )}

          {showEmptyState && (
            <div className="flex h-full flex-col items-start justify-center pb-6">
              <div className="mb-4">
                <p className="text-base font-semibold text-plum">
                  Hi! How can I help?
                </p>
                <p className="mt-1 text-xs leading-relaxed text-plum-soft">
                  {cvId
                    ? "I know your current CV. Ask me anything about improving it, or what to do next."
                    : "Open a CV in the editor for personalized advice. Or try one of these:"}
                </p>
              </div>
              <div className="flex w-full flex-col gap-2">
                {starters.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleStarter(p)}
                    className="rounded-xl border border-plum/15 bg-white px-3.5 py-2.5 text-left text-xs font-medium text-plum transition-colors hover:border-coral/40 hover:bg-coral-soft/30 hover:text-coral-deep focus:outline-none focus:ring-2 focus:ring-coral/30"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!showEmptyState && (
            <div className="flex flex-col gap-3">
              {messages.map((m) => (
                <MessageBubble key={m.id} msg={m} />
              ))}
              {sending && <TypingDots />}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-plum/10 bg-white px-3 py-3">
          <div className="flex items-end gap-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your CV, careers, interviews..."
              disabled={sending}
              maxLength={MAX_MESSAGE}
              rows={1}
              className="flex-1 resize-none rounded-xl border border-plum/15 bg-cream-soft px-3 py-2 text-sm leading-relaxed text-plum placeholder:text-plum-faint focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 disabled:cursor-not-allowed disabled:opacity-60"
              style={{ maxHeight: 140 }}
            />
            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={!canSend}
              aria-label="Send message"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-coral text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>
          <div className="mt-1.5 flex items-center justify-between gap-2 text-[10px] text-plum-faint">
            <span>Enter to send · Shift+Enter for newline</span>
            <span
              className={
                input.length > MAX_MESSAGE - 100 ? "text-coral-deep" : ""
              }
            >
              {input.length}/{MAX_MESSAGE}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
