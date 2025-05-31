"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { SendIcon, Bot, User } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatbotWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm your personal assistant. Ask me anything about John's content, resume, or projects!",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      // In a real app, you would call your AI service here
      const botResponses: Record<string, string> = {
        hi: "Hello! How can I help you today?",
        hello: "Hi there! What would you like to know about John's work?",
        resume:
          "John has 5+ years of experience in full-stack development, specializing in React, Node.js, and cloud technologies. You can view his full resume on the Resume page!",
        blog: "John regularly writes about web development, AI, and tech trends. Check out his latest posts in the Blog section!",
        youtube:
          "John's YouTube channel features tutorials on web development, coding tips, and tech reviews. His most popular video has over 100K views!",
        contact: "You can reach John via email at john@example.com or through the Contact form on this site.",
        projects:
          "John has worked on various projects including e-commerce platforms, SaaS applications, and mobile apps. His portfolio showcases these in detail.",
      }

      let botResponse =
        "I'm not sure how to answer that. Could you try asking something about John's blog posts, YouTube videos, or resume?"

      // Simple keyword matching
      for (const [keyword, response] of Object.entries(botResponses)) {
        if (input.toLowerCase().includes(keyword)) {
          botResponse = response
          break
        }
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">Chat with Me</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <Avatar className={`h-8 w-8 ${message.sender === "user" ? "bg-primary" : "bg-muted"}`}>
                  {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </Avatar>
                <div
                  className={`rounded-lg px-3 py-2 text-sm ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-2 max-w-[80%]">
                <Avatar className="h-8 w-8 bg-muted">
                  <Bot className="h-4 w-4" />
                </Avatar>
                <div className="rounded-lg px-3 py-2 text-sm bg-muted">
                  <span className="flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <SendIcon className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
