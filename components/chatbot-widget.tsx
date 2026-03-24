"use client"

import { FormEvent, useEffect, useRef, useState } from "react"

const CONSENT_KEY = "the_margin_consented_v1"

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  text: string
}

function ConsentModal({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) {
  const [checked, setChecked] = useState(false)

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-[#0B0B0B]/80 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-sm rounded-2xl border border-[#E8E5E0]/16 bg-[#141414] p-6">
        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-[#C45A3C]">Before you chat</p>
        <h2 className="mb-3 font-serif text-lg text-[#E8E5E0]">Data Notice</h2>
        <p className="mb-5 text-sm leading-relaxed text-[#bfb7ad]">
          This chat is powered by OpenAI. Treat it like a public-facing AI interface and do not share sensitive or
          confidential information.
        </p>
        <label className="mb-5 flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#C45A3C]"
          />
          <span className="text-sm text-[#E8E5E0]">
            I understand this is an AI system and I will not share sensitive or confidential information.
          </span>
        </label>
        <div className="flex gap-3">
          <button
            onClick={onDecline}
            className="flex-1 rounded-full border border-[#E8E5E0]/18 px-4 py-2 text-xs uppercase tracking-[0.14em] text-[#9f968c] transition hover:border-[#E8E5E0]/40"
          >
            Decline
          </button>
          <button
            disabled={!checked}
            onClick={onAccept}
            className="flex-1 rounded-full border border-[#C45A3C]/45 px-4 py-2 text-xs uppercase tracking-[0.14em] text-[#F5DDD5] transition hover:border-[#C45A3C] hover:bg-[#C45A3C]/18 disabled:cursor-not-allowed disabled:opacity-40"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ChatbotWidget() {
  const [threadId, setThreadId] = useState<string>()
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "seed-1",
      role: "assistant",
      text: "I am The Margin's editorial assistant. Ask about strategy, systems, execution, current coverage, or the ideas behind the work.",
    },
  ])
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const [hasConsented, setHasConsented] = useState(false)
  const [showConsent, setShowConsent] = useState(false)
  const [pendingMessage, setPendingMessage] = useState("")
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHasConsented(localStorage.getItem(CONSENT_KEY) === "true")
  }, [])

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, sending])

  const handleConsent = async () => {
    localStorage.setItem(CONSENT_KEY, "true")
    setHasConsented(true)
    setShowConsent(false)
    await fetch("/api/consent", { method: "POST" })
    if (pendingMessage) {
      setPendingMessage("")
      await send(pendingMessage)
    }
  }

  const handleDecline = () => {
    setShowConsent(false)
    setPendingMessage("")
  }

  const tryToSend = (text: string) => {
    if (!text.trim()) return
    if (!hasConsented) {
      setPendingMessage(text)
      setShowConsent(true)
      return
    }
    void send(text)
  }

  const send = async (text: string) => {
    const prompt = text.trim()
    if (!prompt || sending) return

    setSending(true)
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", text: prompt }])
    setInput("")

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId, message: prompt }),
      })
      const data = (await res.json()) as { threadId?: string; reply?: string; error?: string }
      if (!res.ok || !data.reply) throw new Error(data.error || "Unable to process chat request.")
      if (data.threadId) setThreadId(data.threadId)
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: "assistant", text: data.reply as string }])
    } catch {
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: "assistant", text: "Service unavailable at this time." }])
    } finally {
      setSending(false)
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    tryToSend(input)
  }

  return (
    <div className="relative flex h-[68vh] min-h-[560px] flex-col rounded-2xl border border-[#E8E5E0]/16 bg-[#0B0B0B]/92">
      {showConsent && <ConsentModal onAccept={handleConsent} onDecline={handleDecline} />}
      <div className="flex items-center justify-between border-b border-[#E8E5E0]/12 px-4 py-3 md:px-5">
        <p className="text-xs uppercase tracking-[0.18em] text-[#C45A3C]">Editorial Session</p>
        <p className="text-xs text-[#bfb7ad]">{sending ? "Thinking..." : "Ready"}</p>
      </div>

      <div ref={scrollerRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5 md:px-5">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed md:max-w-[80%] ${
                m.role === "user"
                  ? "border border-[#C45A3C]/45 bg-[#C45A3C]/18 text-[#F5DDD5]"
                  : "border border-[#E8E5E0]/14 bg-[#141414]/90 text-[#E8E5E0]"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {sending ? (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-[#E8E5E0]/14 bg-[#141414]/90 px-4 py-3 text-sm text-[#d2ccc3]">
              Generating response...
            </div>
          </div>
        ) : null}
      </div>

      <form onSubmit={onSubmit} className="border-t border-[#E8E5E0]/12 p-4 md:p-5">
        <div className="rounded-2xl border border-[#E8E5E0]/18 bg-[#111111] p-2">
          <textarea
            value={input}
            disabled={sending}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                tryToSend(input)
              }
            }}
            placeholder="Ask The Margin about strategy, systems, media, or current coverage..."
            rows={4}
            className="w-full resize-none bg-transparent px-3 py-2 text-sm text-[#E8E5E0] outline-none placeholder:text-[#9f968c]"
          />
          <div className="mt-2 flex items-center justify-between border-t border-[#E8E5E0]/10 px-3 pt-2">
            <p className="text-xs text-[#9f968c]">Enter to send, Shift+Enter for newline</p>
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="rounded-full border border-[#C45A3C]/45 px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-[#F5DDD5] transition hover:border-[#C45A3C] hover:bg-[#C45A3C]/18 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Send
            </button>
          </div>
        </div>
        <p className="mt-2 px-1 text-center text-[10px] text-[#9f968c]/60">
          Avoid sharing sensitive or confidential information in this chat.
        </p>
      </form>
    </div>
  )
}
