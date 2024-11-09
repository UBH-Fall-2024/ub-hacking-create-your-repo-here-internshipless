import React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../utils/helpers'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-wonderland-primary text-white hover:bg-wonderland-primary/90',
        secondary: 'bg-wonderland-secondary text-white hover:bg-wonderland-secondary/90',
        outline: 'border border-wonderland-primary text-wonderland-primary hover:bg-wonderland-primary/10',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3',
        lg: 'h-12 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = 'Button'

export { Button, buttonVariants }