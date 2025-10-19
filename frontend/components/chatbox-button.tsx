"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AIChat } from "@/components/ai-chat"

export function ChatboxButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="h-14 w-14 rounded-full bg-primary shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 group relative"
          aria-label="Open chat"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Pulse animation ring */}
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />

          {/* Icon */}
          <MessageCircle className="h-6 w-6 text-primary-foreground group-hover:scale-110 transition-transform duration-300" />
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)]">
          <AIChat />
          <Button
            size="sm"
            variant="outline"
            className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  )
}
