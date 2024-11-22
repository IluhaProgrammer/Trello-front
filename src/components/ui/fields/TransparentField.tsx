import cn from 'clsx'
import { forwardRef, InputHTMLAttributes } from 'react'

type TypeTransparentField = InputHTMLAttributes<HTMLInputElement>

export const TransparentField = forwardRef<HTMLInputElement, TypeTransparentField>(
    ({className, ...res}, ref) => {
    return (
        <input
            className={cn(
                'bg-transparent border-none focus:outline-0 focus:shadow-transparent w-full', className
            )}
            ref={ref}
            {...res}
        />
    )
}
)

TransparentField.displayName = 'TransparentField'