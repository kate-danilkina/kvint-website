import { forwardRef } from 'react'
import Link from 'next/link'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

/** Consent to personal data processing (152-ФЗ). Required on every lead form. */
const ConsentCheckbox = forwardRef<HTMLInputElement, Props>(({ id, error, ...props }, ref) => (
  <div>
    <label htmlFor={id} className="flex items-start gap-3 text-sm text-muted leading-snug cursor-pointer">
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[#1A6EFF] cursor-pointer"
        aria-invalid={error ? true : undefined}
        {...props}
      />
      <span>
        Согласен на обработку персональных данных по{' '}
        <Link href="/privacy" target="_blank" className="text-text underline underline-offset-2 hover:text-accent">
          политике конфиденциальности
        </Link>
      </span>
    </label>
    {error && <p className="text-sm text-red-400 font-mono mt-1.5">{error}</p>}
  </div>
))

ConsentCheckbox.displayName = 'ConsentCheckbox'
export default ConsentCheckbox
