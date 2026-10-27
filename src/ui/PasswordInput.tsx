"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
    id: string;
    value: string;
    onChange: (value: string) => void;
    hasError?: boolean;
    autoComplete?: string;
}

export default function PasswordInput({
    id,
    value,
    onChange,
    hasError = false,
    autoComplete,
}: PasswordInputProps) {
    // The show/hide state lives here, so each form doesn't need its own
    const [show, setShow] = useState(false);

    return (
        <div className="relative mt-1">
            <input
                id={id}
                type={show ? "text" : "password"}
                autoComplete={autoComplete}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full rounded-md border px-3 py-2 pr-10 text-sm text-black ${
                    hasError ? "border-red-500" : "border-gray-300"
                }`}
            />
            <button
                type="button"
                onClick={() => setShow((prev) => !prev)}
                aria-label={show ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
    );
}