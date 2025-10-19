"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Loader2 } from "lucide-react"
import { useAsk } from "@/hooks/use-api"

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const { ask, loading, error } = useAsk()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")

    try {
      const response = await ask({ question: input.trim() })
      if (response) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: response,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiMessage])
      }
    } catch (err) {
      console.error('Error getting AI response:', err)
    }
  }

  return (
    <Card className="border-border/50 bg-card/50 p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center gap-2">
        <Bot className="h-5 w-5 text-primary" />
        <Badge variant="outline" className="border-primary/50 text-primary">
          AI Assistant
        </Badge>
      </div>
      
      <div className="mb-4 h-64 overflow-y-auto space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p>Ask me anything about waste management, recycling, or industrial symbiosis!</p>
            <p className="text-sm mt-2">I'll keep my responses short and helpful.</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`rounded-full p-2 ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
        
        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="flex gap-2">
              <div className="rounded-full p-2 bg-muted text-muted-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-lg p-3 bg-muted text-foreground">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          Error: {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about waste management, recycling, or industrial symbiosis..."
          disabled={loading}
          className="flex-1"
        />
        <Button type="submit" disabled={loading || !input.trim()}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </Card>
  )
}
