"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

type Msg = {
  id: string;
  userId: string;
  vendorId: string;
  sender: "USER" | "VENDOR";
  body: string;
  createdAt: string;
};

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function ChatPanel() {
  const [userId, setUserId] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const canChat = userId.trim() && vendorId.trim();

  const fetchMessages = useCallback(async () => {
    if (!canChat) return;
    setError(null);
    const res = await fetch(
      `/api/messages?userId=${encodeURIComponent(userId)}&vendorId=${encodeURIComponent(vendorId)}`
    );
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(typeof j.error === "string" ? j.error : "Failed to load messages");
      return;
    }
    const data = (await res.json()) as Msg[];
    setMessages(data);
  }, [userId, vendorId, canChat]);

  useEffect(() => {
    void fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!canChat || !input.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId.trim(),
          vendorId: vendorId.trim(),
          sender: "USER",
          body: input.trim(),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(typeof j.error === "string" ? j.error : "Send failed");
      }
      setInput("");
      await fetchMessages();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Send failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Enter a <strong>user</strong> and <strong>vendor</strong> id from your database (create them via
        API or Prisma Studio). Messages are stored per user–vendor pair.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="chat-user" className="text-xs font-medium text-zinc-500">
            User ID
          </label>
          <input
            id="chat-user"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-200 bg-background px-3 py-2 text-sm dark:border-zinc-700"
            placeholder="cuid…"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="chat-vendor" className="text-xs font-medium text-zinc-500">
            Vendor ID
          </label>
          <input
            id="chat-vendor"
            value={vendorId}
            onChange={(e) => setVendorId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-200 bg-background px-3 py-2 text-sm dark:border-zinc-700"
            placeholder="cuid…"
            autoComplete="off"
          />
        </div>
      </div>

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </p>
      ) : null}

      <div className="flex h-[min(420px,55vh)] flex-col rounded-xl border border-zinc-200 bg-zinc-50/80 dark:border-zinc-700 dark:bg-zinc-900/50">
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {!canChat ? (
            <p className="text-center text-sm text-zinc-500">Set user and vendor ids to load chat.</p>
          ) : messages.length === 0 ? (
            <p className="text-center text-sm text-zinc-500">No messages yet. Say hello.</p>
          ) : (
            messages.map((m) => {
              const mine = m.sender === "USER";
              return (
                <div
                  key={m.id}
                  className={`flex ${mine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                      mine
                        ? "rounded-br-md bg-violet-600 text-white dark:bg-violet-500"
                        : "rounded-bl-md border border-zinc-200 bg-white text-foreground dark:border-zinc-600 dark:bg-zinc-800"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{m.body}</p>
                    <p
                      className={`mt-1 text-[10px] ${mine ? "text-violet-200" : "text-zinc-500"}`}
                    >
                      {mine ? "You" : "Vendor"} · {formatTime(m.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>
        <form
          onSubmit={handleSend}
          className="flex gap-2 border-t border-zinc-200 p-3 dark:border-zinc-700"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!canChat || loading}
            className="min-w-0 flex-1 rounded-lg border border-zinc-200 bg-background px-3 py-2 text-sm dark:border-zinc-700"
            placeholder={canChat ? "Type a message…" : "Set ids first…"}
          />
          <button
            type="submit"
            disabled={!canChat || loading || !input.trim()}
            className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-violet-500"
          >
            <Send className="size-4" />
            Send
          </button>
        </form>
      </div>

      <p className="text-xs text-zinc-500">
        To simulate a vendor reply, use{" "}
        <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">sender: &quot;VENDOR&quot;</code>{" "}
        in a POST to <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">/api/messages</code>.
      </p>
    </div>
  );
}
