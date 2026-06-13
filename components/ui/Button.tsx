'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type BaseProps = {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  children: React.ReactNode
  className?: string
}

type AsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { as?: 'button'; href?: never }

type AsLink = BaseProps & { as: 'link'; href: string }

type ButtonProps = AsButton | AsLink

const styles = {
  base: 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed',
  variants: {
    primary: 'bg-accent text-white hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(26,110,255,0.4)]',
    secondary: 'border border-white/25 text-text hover:border-accent hover:text-accent hover:scale-[1.02]',
    ghost: 'text-muted hover:text-text hover:bg-white/5',
  },
  sizes: {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  },
}

const Button = forwardRef<HTMLButtonElement, AsButton>(
  ({ className, variant = 'primary', size = 'md', fullWidth, children, as, ...props }, ref) => {
    const cls = cn(
      styles.base,
      styles.variants[variant],
      styles.sizes[size],
      fullWidth && 'w-full',
      className
    )
    return (
      <button ref={ref} className={cls} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  fullWidth,
  children,
  className,
}: AsLink) {
  const cls = cn(
    styles.base,
    styles.variants[variant],
    styles.sizes[size],
    fullWidth && 'w-full',
    className
  )
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}
