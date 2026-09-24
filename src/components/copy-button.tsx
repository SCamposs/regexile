"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";

type CopyState = "idle" | "copied" | "error";

async function writeClipboard(value: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Clipboard unavailable");
}

export function CopyButton({ value, label = "Copy", tone = "primary" }: {
  value: string;
  label?: string;
  tone?: "primary" | "gold";
}) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function handleCopy() {
    try {
      await writeClipboard(value);
      setState("copied");
    } catch {
      setState("error");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 1800);
  }

  const text = state === "copied" ? "Copied" : state === "error" ? "Copy failed" : label;
  const Icon = state === "copied" ? Check : state === "error" ? AlertCircle : Copy;

  return (
    <button
      type="button"
      className="copy-button"
      data-tone={tone}
      data-state={state}
      onClick={handleCopy}
      aria-label={`${text}: ${value}`}
    >
      <Icon size={14} strokeWidth={2} aria-hidden="true" />
      <span>{text}</span>
    </button>
  );
}
