"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import PasswordInput from "@/ui/PasswordInput";
import { registerSchema } from "@/lib/validation";

type FieldErrors = { name?: string; email?: string; password?: string };

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError("");

        // 1. Check the inputs with zod before calling the server
        const result = registerSchema.safeParse({ name, email, password });

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

        // 2. Inputs are valid, so create the account
        const { error } = await authClient.signUp.email({
            name: result.data.name,
            email: result.data.email,
            password: result.data.password,
            callbackURL: "/login",
        });

        setLoading(false);

        // 3. Email already used, etc.
        if (error) {
            setServerError(error.message ?? "Something went wrong. Please try again.");
            return;
        }

        router.push("/login");
    };

    const inputClass = (hasError: boolean) =>
        `mt-1 w-full rounded-md border px-3 py-2 text-sm text-black ${
            hasError ? "border-red-500" : "border-gray-300"
        }`;

    return (
        <div className="flex min-h-[80vh] items-center justify-center">
            {/* noValidate turns off the browser's own popups so zod's messages show instead */}
            <form
                onSubmit={handleSignUp}
                noValidate
                className="w-full max-w-sm rounded-lg border bg-white p-6 shadow-sm"
            >
                <h1 className="mb-6 text-xl font-bold text-gray-950">
                    Create a ShopDesk Account
                </h1>

                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputClass(!!fieldErrors.name)}
                    />
                    {fieldErrors.name && (
                        <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
                    )}
                </div>

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

                {/* Password */}
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <PasswordInput
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={setPassword}
                        hasError={!!fieldErrors.password}
                    />
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
                    className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
                >
                    {loading ? "Creating account..." : "Sign Up"}
                </button>

                {/* Link to Login */}
                <p className="mt-4 text-center text-xs text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Sign In
                    </Link>
                </p>
            </form>
        </div>
    );
}