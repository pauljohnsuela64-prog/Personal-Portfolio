import type { AnchorHTMLAttributes, ComponentPropsWithRef } from 'react'

type Variant = 'primary' | 'secondary'

export function Button({ variant = 'primary', className = '', type = 'button', ...props }:
  ComponentPropsWithRef<'button'> & { variant?: Variant }) {
  return <button type={type} className={`button button--${variant} ${className}`} {...props} />
}

export function ButtonLink({ variant = 'primary', className = '', ...props }:
  AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return <a className={`button button--${variant} ${className}`} {...props} />
}
