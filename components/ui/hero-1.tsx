import { cn } from "@/lib/utils"

export type GlowHeroProps = {
  label?: string
  glowText: string
  labelSize?: "sm" | "md" | "lg"
  glowTextSize?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const labelSizeClasses = {
  sm: "text-xl",
  md: "text-2xl md:text-3xl",
  lg: "text-3xl md:text-4xl",
}

const glowTextSizeClasses = {
  sm: "text-3xl md:text-4xl",
  md: "text-4xl md:text-5xl",
  lg: "text-5xl md:text-6xl",
  xl: "text-6xl md:text-7xl",
}

export default function GlowHero({
  label,
  glowText,
  labelSize = "md",
  glowTextSize = "lg",
  className,
}: GlowHeroProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center", className)}
    >
      {label ? (
        <div
          className={cn(
            labelSizeClasses[labelSize],
            "mb-3 text-center font-medium text-white/85 transition-opacity duration-300 ease-out md:mb-4",
          )}
        >
          {label}
        </div>
      ) : null}
      <div className="relative isolate">
        <div
          className={cn(
            "glow-hero-text text-center font-medium tracking-tight",
            glowTextSizeClasses[glowTextSize],
          )}
          data-text={glowText}
        >
          <span className="relative z-20 text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)]">
            {glowText}
          </span>
        </div>
      </div>
    </div>
  )
}
