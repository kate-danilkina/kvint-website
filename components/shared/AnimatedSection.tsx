// Scroll-reveal was applied to every block, which made the page feel templated.
// These wrappers now render content immediately; motion is reserved for
// data elements (hero report, process funnel) that animate in their own components.

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function AnimatedSection({ children, className = '' }: Props) {
  return <div className={className}>{children}</div>
}

export function AnimatedGrid({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

export function AnimatedItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}
