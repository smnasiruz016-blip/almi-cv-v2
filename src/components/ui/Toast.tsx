"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CheckCircle2, XCircle } from "lucide-react";

type ToastKind = "success" | "error";
type ToastEntry = { id: number; kind: ToastKind; message: string };

type ToastCtx = (message: string, kind?: ToastKind) => void;

const Ctx = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const counter = useRef(0);

  const showToast = useCallback<ToastCtx>((message, kind = "success") => {
    const id = ++counter.current;
    setToasts((prev) => [...prev, { id, kind, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  return (
    <Ctx.Provider value={showToast}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2">
        {toasts.map((t) => (
          <ToastItem key={t.id} entry={t} />
        ))}
      </div>
    </Ctx.Provider>
  );
}

function ToastItem({ entry }: { entry: ToastEntry }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);
  const isSuccess = entry.kind === "success";
  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-auto flex items-center gap-3 rounded-pill border px-4 py-2.5 text-sm shadow-warm-card-hover transition-all duration-200 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      } ${
        isSuccess
          ? "border-sage/30 bg-white text-plum"
          : "border-coral-deep/30 bg-white text-coral-deep"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="h-4 w-4 text-sage" />
      ) : (
        <XCircle className="h-4 w-4 text-coral-deep" />
      )}
      <span className="font-medium">{entry.message}</span>
    </div>
  );
}

export function useToast(): ToastCtx {
  const ctx = useContext(Ctx);
  if (!ctx) {
    // No-op fallback so callers don't crash if provider isn't mounted.
    return () => {};
  }
  return ctx;
}
