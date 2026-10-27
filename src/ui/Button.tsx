import type { ButtonProps } from '../lib/types'

export default function Button({ onClick, children }: ButtonProps) {
    return (
        <button onClick={onClick}>
            {children}
        </button>
    )
}
