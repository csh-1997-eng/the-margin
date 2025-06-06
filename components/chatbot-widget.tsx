"use client";
import { useState, useRef } from "react";

export default function ChatbotWidget() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [threadId, setThreadId] = useState<string>();
  const [log, setLog] = useState<string[]>([]);
  const [sending, setSending] = useState(false);

  const send = async (text: string) => {
    setSending(true);
    const r = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ threadId, message: text }),
    }).then(r => r.json());

    setThreadId(r.threadId);
    setLog(l => [...l, "🧑 " + text, "🤖 " + r.reply]);
    setSending(false);
  };

  const upload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);

    await fetch("/api/chat/upload", { method: "POST", body: fd });
    alert("File uploaded & indexed 🎉  Ask away!");
  };

  return (
    <div className="border rounded-xl p-4 space-y-2">
      <h2 className="font-semibold">Ask‑my‑Files Chatbot</h2>

      <input type="file" ref={fileRef} className="block" />
      <button onClick={upload} className="btn mt-2">Upload</button>

      <hr className="my-3"/>

      <ChatBox disabled={sending} onSend={send} />

      <div className="prose max-h-64 overflow-y-auto">
        {log.map((l, i) => <p key={i}>{l}</p>)}
      </div>
    </div>
  );
}

function ChatBox({ disabled, onSend }:{ disabled:boolean; onSend:(t:string)=>void }) {
  const [text, setText] = useState("");
  return (
    <form onSubmit={e => { e.preventDefault(); onSend(text); setText(""); }}>
      <input
        value={text}
        disabled={disabled}
        onChange={e => setText(e.target.value)}
        className="border rounded px-2 py-1 w-full"
        placeholder="Ask something about your file..."
      />
    </form>
  );
}












// "use client";

// import { useState, useRef, useEffect, type FormEvent } from "react";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar } from "@/components/ui/avatar";
// import { SendIcon, Bot, User } from "lucide-react";

// type UiMsg = {
//   id: string;
//   content: string;
//   sender: "user" | "bot";
//   timestamp: Date;
// };

// export default function ChatbotWidget() {
//   const [messages, setMessages] = useState<UiMsg[]>([
//     {
//       id: "1",
//       content: "Hi there! I'm your personal assistant. Ask me anything about John's content, resume, or projects!",
//       sender: "bot",
//       timestamp: new Date(),
//     },
//   ]);

//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const bottomRef = useRef<HTMLDivElement>(null);

//   useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

//   /** Converts UI messages → OpenAI role messages */
//   const toOpenAiFormat = (msgs: UiMsg[]) =>
//     msgs.map(({ sender, content }) => ({
//       role: sender === "user" ? "user" : "assistant",
//       content,
//     }));

//   const handleSendMessage = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMsg: UiMsg = {
//       id: Date.now().toString(),
//       content: input,
//       sender: "user",
//       timestamp: new Date(),
//     };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     setIsLoading(true);

//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ thread: toOpenAiFormat([...messages, userMsg]) }),
//       });

//       const data = (await res.json()) as { content?: string; error?: string };
//       const botMsg: UiMsg = {
//         id: Date.now().toString() + "-bot",
//         content: data.content ?? data.error ?? "Sorry, something went wrong.",
//         sender: "bot",
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, botMsg]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now().toString() + "-bot",
//           content: "Network error – please try again.",
//           sender: "bot",
//           timestamp: new Date(),
//         },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Card className="h-[400px] flex flex-col">
//       <CardHeader>
//         <CardTitle className="text-xl">Chat with Me</CardTitle>
//       </CardHeader>

//       <CardContent className="flex-1 overflow-y-auto">
//         <div className="space-y-4">
//           {messages.map((m) => (
//             <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
//               <div className={`flex gap-2 max-w-[80%] ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
//                 <Avatar className={`h-8 w-8 ${m.sender === "user" ? "bg-primary" : "bg-muted"}`}>
//                   {m.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
//                 </Avatar>
//                 <div
//                   className={`rounded-lg px-3 py-2 text-sm ${
//                     m.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
//                   }`}
//                 >
//                   {m.content}
//                 </div>
//               </div>
//             </div>
//           ))}

//           {isLoading && (
//             <div className="flex justify-start">
//               <div className="flex gap-2 max-w-[80%]">
//                 <Avatar className="h-8 w-8 bg-muted">
//                   <Bot className="h-4 w-4" />
//                 </Avatar>
//                 <div className="rounded-lg px-3 py-2 text-sm bg-muted">
//                   <span className="flex gap-1">
//                     <span className="animate-bounce">.</span>
//                     <span className="animate-bounce delay-100">.</span>
//                     <span className="animate-bounce delay-200">.</span>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div ref={bottomRef} />
//         </div>
//       </CardContent>

//       <CardFooter>
//         <form onSubmit={handleSendMessage} className="flex w-full gap-2">
//           <Input
//             placeholder="Ask me anything..."
//             value={input}
//             onChange={(e) => {
//                           console.log("value →", e.target.value);   // should print each keystroke
//                           setInput(e.target.value);
//                         }}
//             disabled={isLoading}
//             className="flex-1"
//           />
//           <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
//             <SendIcon className="h-4 w-4" />
//             <span className="sr-only">Send message</span>
//           </Button>
//         </form>
//       </CardFooter>
//     </Card>
//   );
// }
