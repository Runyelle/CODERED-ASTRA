"use client"

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute -left-40 top-0 h-96 w-96 animate-blob rounded-full bg-primary/20 opacity-70 blur-3xl" />
      <div className="animation-delay-2000 absolute -right-40 top-0 h-96 w-96 animate-blob rounded-full bg-accent/20 opacity-70 blur-3xl" />
      <div className="animation-delay-4000 absolute -bottom-40 left-20 h-96 w-96 animate-blob rounded-full bg-primary/30 opacity-70 blur-3xl" />
      <div className="animation-delay-6000 absolute bottom-0 right-20 h-96 w-96 animate-blob rounded-full bg-primary/20 opacity-70 blur-3xl" />
      <div className="animation-delay-8000 absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-blob rounded-full bg-accent/15 opacity-70 blur-3xl" />
    </div>
  )
}
