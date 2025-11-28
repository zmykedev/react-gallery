"use client"

import { cn } from "@/lib/utils"
import { useRef } from "react"

interface MagicCardProps {
  children: React.ReactNode
  className?: string
}

export function MagicCard({ children, className }: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    cardRef.current.style.setProperty("--mouse-x", `${x}px`)
    cardRef.current.style.setProperty("--mouse-y", `${y}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative flex size-full overflow-hidden rounded-xl",
        className,
      )}
    >
      <div className="relative z-10">{children}</div>
      <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100">
        <div
          className="absolute inset-0 rounded-xl opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 170, 64, 0.15), transparent 40%)",
          }}
        />
      </div>
    </div>
  )
}

