"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { loginSchema } from "@/lib/validation";
import PasswordInput from "@/ui/PasswordInput";
import { FieldErrors } from "@/lib/types";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError("");

        // 1. Check the inputs with zod before calling the server
        const result = loginSchema.safeParse({ email, password });

        if (!result.success) {
            const errors: FieldErrors = {};

            // Keep the first message for each field
            for (const issue of result.error.issues) {
                const field = issue.path[0] as keyof FieldErrors;
                if (!errors[field]) errors[field] = issue.message;
            }

            setFieldErrors(errors);
            return; // stop here, the inputs are not valid
        }

        setFieldErrors({});
        setLoading(true);

        // 2. Inputs are valid, so sign in
        const { error } = await authClient.signIn.email({
            email: result.data.email,
            password: result.data.password,
            callbackURL: "/", // Redirects here after successful login
        });

        setLoading(false);

        // 3. Wrong password, unknown email, etc.
        if (error) {
            setServerError(error.message ?? "Invalid email or password.");
        }
    };

    const inputClass = (hasError: boolean) =>
        `mt-1 w-full rounded-md border px-3 py-2 text-sm text-black ${hasError ? "border-red-500" : "border-gray-300"
        }`;

    return (
        <div className="flex min-h-[80vh] items-center justify-center">
            {/* noValidate turns off the browser's own popups so zod's messages show instead */}
            <form
                onSubmit={handleSignIn}
                noValidate
                className="w-full max-w-sm rounded-lg border bg-white p-6 shadow-sm"
            >
                <h1 className="mb-6 text-xl font-bold text-gray-950">
                    Sign In to ShopDesk
                </h1>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClass(!!fieldErrors.email)}
                    />
                    {fieldErrors.email && (
                        <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
                    )}
                </div>

                {/* Password with show/hide toggle */}
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="relative">
                        <PasswordInput
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={setPassword}
                            hasError={!!fieldErrors.password}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {fieldErrors.password && (
                        <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
                    )}
                </div>

                {/* Error from the server */}
                {serverError && (
                    <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                        {serverError}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>

                <p className="mt-4 text-center text-xs text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
}