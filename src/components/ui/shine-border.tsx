import { cn } from "@/lib/utils"

interface ShineBorderProps {
  borderRadius?: number
  borderWidth?: number
  duration?: number
  color?: string
  className?: string
  children: React.ReactNode
}

export function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = "#ffaa40",
  className,
  children,
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
          "--border-width": `${borderWidth}px`,
          "--duration": `${duration}s`,
          "--color": color,
        } as React.CSSProperties
      }
      className={cn(
        "relative inline-block rounded-[var(--border-radius)]",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-[var(--border-radius)]",
          "bg-gradient-to-r from-[var(--color)] via-white/0 to-[var(--color)]",
          "animate-shine-border",
        )}
        style={{
          padding: "var(--border-width)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative z-10 rounded-[calc(var(--border-radius)-var(--border-width))]">
        {children}
      </div>
    </div>
  )
}

