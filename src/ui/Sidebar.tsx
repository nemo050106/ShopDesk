"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, Package, Store } from "lucide-react";
import { authClient } from "@/lib/auth-client";

// To add a new dashboard page, add one object here
const links = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/products", label: "All Products", icon: Package },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                    router.refresh();
                },
            },
        });
    };

    return (
        <aside className="flex flex-col border-b bg-white md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:border-b-0 md:border-r">
            {/* Logo */}
            <Link href="/" className="flex h-16 items-center gap-3 border-b px-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/30">
                    <Store size={18} />
                </span>
                <span className="text-xl font-bold text-gray-900">
                    Shop<span className="text-blue-600">Desk</span>
                </span>
            </Link>

            {/* Menu */}
            <p className="hidden px-6 pb-2 pt-6 text-xs font-semibold uppercase tracking-wider text-gray-400 md:block">
                Menu
            </p>

            <nav className="flex gap-2 overflow-x-auto p-3 md:flex-col md:pt-0">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                                isActive
                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                        >
                            <Icon size={18} />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Sign out, pinned to the bottom on desktop */}
            <div className="border-t p-3 md:mt-auto">
                <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}