"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ChatboxButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        className="h-14 w-14 rounded-full bg-primary shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 group relative"
        aria-label="Open chat"
      >
        {/* Pulse animation ring */}
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />

        {/* Icon */}
        <MessageCircle className="h-6 w-6 text-primary-foreground group-hover:scale-110 transition-transform duration-300" />
      </Button>
    </div>
  )
}
