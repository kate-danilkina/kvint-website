'use client'

import { forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, id, ...props }, ref) => {
  // Error text is linked to the field, so screen readers announce it with the input
  const reactId = useId()
  const errorId = `${id ?? reactId}-error`
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-muted font-mono">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          // ym-disable-keys: Webvisor must not record what people type into form fields
          'ym-disable-keys w-full px-4 py-3 rounded-xl bg-black/5 border border-black/10 text-text placeholder:text-muted',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent focus:bg-black/[0.07] transition-all duration-200',
          'text-base', // min 16px prevents iOS Safari zoom
          error && 'border-red-500/60',
          className
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-sm text-red-700 font-mono">
          {error}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'
export default Input
