import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'accent' | 'muted' | 'flagship'
  className?: string
}

export default function Badge({ children, variant = 'muted', className }: BadgeProps) {
  const variants = {
    accent: 'bg-accent/15 text-accent border border-accent/30',
    muted: 'bg-white/5 text-muted border border-white/10',
    flagship: 'bg-accent text-white',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-grotesk font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
