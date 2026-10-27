"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data } = await authClient.signIn.email({
            email,
            password,
            callbackURL: "/", // Redirects here after successful login
        });
        console.log(data)
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center">
            <form onSubmit={handleSignIn} className="w-full max-w-sm rounded-lg border bg-white p-6 shadow-sm">
                <h1 className="mb-6 text-xl font-bold text-gray-950">Sign In to ShopDesk</h1>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm text-black"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
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
                    className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    Sign In
                </button>
                <p className="mt-4 text-center text-xs text-gray-600">
                    Dont have an account?{" "}
                    <Link href="/register" className="text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
}