"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { error } from "console";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
   const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);

        const { data,error } = await authClient.signUp.email({
            name,
            email,
            password,
            callbackURL: "/login",
        });

        setLoading(false);

        if (error) {
            setErrorMsg(error.message ?? "Something went wrong. Please try again.");
            return;
        }

        router.push("/login");
        console.log(data)
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center">
            <form
                onSubmit={handleSignUp}
                className="w-full max-w-sm rounded-lg border bg-white p-6 shadow-sm"
            >
                <h1 className="mb-6 text-xl font-bold text-gray-950">
                    Create a ShopDesk Account
                </h1>

                {/* Name Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm text-black"
                        required
                    />
                </div>

                {/* Email Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm text-black"
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm text-black"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                >
                    Sign Up
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