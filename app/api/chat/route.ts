import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const { threadId, message } = await req.json();

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

  // 1 – Create or reuse a thread
  const thread =
    threadId ??
    (await openai.beta.threads.create()).id;

  // 2 – Add user message
  await openai.beta.threads.messages.create(thread, {
    role: "user",
    content: message,
  });

  // 3 – Run the assistant
  const run = await openai.beta.threads.runs.create(thread, {
    assistant_id: process.env.OPENAI_ASSISTANT_ID!,
  });

  // 4 – Poll until run completes (quick for small docs)
  while (["queued", "in_progress"].includes(run.status)) {
    await new Promise(r => setTimeout(r, 1000));
    const check = await openai.beta.threads.runs.retrieve(thread, run.id);
    if (check.status === "completed") break;
  }

  // 5 – Fetch the assistant’s reply (latest message)
  const msgs = await openai.beta.threads.messages.list(thread, { limit: 1 });
  const reply = msgs.data[0].content[0].text.value;

  return NextResponse.json({ threadId: thread, reply });
}






// app/api/chat/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function POST(req: NextRequest) {
//   const { thread } = await req.json();       // [{ role, content }]
//   if (!thread?.length) {
//     return NextResponse.json({ error: "No messages" }, { status: 400 });
//   }

//   const completion = await openai.chat.completions.create({
//     model: "gpt-4o-mini",                     // pick any Chat model
//     messages: thread,
//     temperature: 0.7,
//   });

//   return NextResponse.json({
//     content: completion.choices[0].message.content,
//   });
// }
