'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, id, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-muted font-grotesk">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text placeholder:text-muted',
          'focus:outline-none focus:border-accent/60 focus:bg-white/[0.07] transition-all duration-200',
          'text-base', // min 16px prevents iOS Safari zoom
          error && 'border-red-500/60',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400 font-grotesk">{error}</p>}
    </div>
  )
})

Input.displayName = 'Input'
export default Input
