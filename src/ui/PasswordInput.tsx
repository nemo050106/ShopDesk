"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
    id: string;
    value: string;
    onChange: (value: string) => void;
    hasError?: boolean;
    autoComplete?: string;
    placeholder?: string;
}

export default function PasswordInput({
    id,
    value,
    onChange,
    hasError = false,
    autoComplete = "current-password",
    placeholder = "••••••••",
}: PasswordInputProps) {
    const [show, setShow] = useState(false);

    return (
        <div className="relative mt-1 w-full">
            <input
                id={id}
                type={show ? "text" : "password"}
                autoComplete={autoComplete}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full rounded-md border bg-white px-3 py-2 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    hasError
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-blue-500"
                }`}
            />
            <button
                type="button"
                tabIndex={-1}
                onClick={() => setShow((prev) => !prev)}
                aria-label={show ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
    );
}