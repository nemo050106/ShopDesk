import type { ButtonProps } from "@/lib/types";

// All button looks live here, in one place
const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "border border-rose-200 bg-white text-rose-600 hover:bg-rose-50",
    outline:
        "border border-gray-200 bg-white text-gray-700 hover:border-blue-200 hover:text-blue-600",
};

export default function Button({
    onClick,
    children,
    type = "button",
    disabled = false,
    variant = "primary",
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium shadow-sm transition disabled:opacity-60 ${styles[variant]}`}
        >
            {children}
        </button>
    );
}