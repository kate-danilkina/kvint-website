import { forwardRef } from 'react'
import Link from 'next/link'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

/**
 * Consent to personal data processing (152-ФЗ). Required on every lead form.
 * Unchecked by default; the form's `required` rule blocks submit until it is ticked.
 * The consent text (/soglasie) and the policy (/privacy) are separate documents, so they are separate links.
 */
const ConsentCheckbox = forwardRef<HTMLInputElement, Props>(({ id, error, ...props }, ref) => (
  <div>
    <label htmlFor={id} className="flex items-start gap-3 text-sm text-muted leading-snug cursor-pointer">
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[#1561E0] cursor-pointer"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      <span>
        <Link href="/soglasie" target="_blank" rel="noopener noreferrer" className="text-text underline underline-offset-2 hover:text-accent">
          Даю согласие на обработку персональных данных
        </Link>{' '}
        и принимаю{' '}
        <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="text-text underline underline-offset-2 hover:text-accent">
          политику конфиденциальности
        </Link>
      </span>
    </label>
    {error && (
      <p id={`${id}-error`} className="text-sm text-red-700 font-mono mt-1.5">
        {error}
      </p>
    )}
  </div>
))

ConsentCheckbox.displayName = 'ConsentCheckbox'
export default ConsentCheckbox
