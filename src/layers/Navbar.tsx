"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  // console.log(pathname)

  // Menu is "open" only while we're still on the path it was opened on
  const [menuOpenPath, setMenuOpenPath] = useState<string | null>(null);
  const isMenuOpen = menuOpenPath === pathname;

  const { data: session, isPending } = authClient.useSession();

  const closeMenu = () => setMenuOpenPath(null);
  const toggleMenu = () => setMenuOpenPath(isMenuOpen ? null : pathname);

  const handleSignOut = async () => {
    closeMenu();
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  const getLinkStyle = (path: string) =>
    pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600 transition-colors";


      if(pathname.includes('dashboard')){
        return null
      }

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* LEFT: Logo */}
        <Link href="/" className="text-xl font-bold text-gray-900">
          Shop<span className="text-blue-600">Desk</span>
        </Link>

        {/* MIDDLE: Desktop Nav Routes */}
        <div className="hidden items-center space-x-8 md:flex">
          <Link href="/" className={getLinkStyle("/")}>
            Home
          </Link>
          <Link href="/dashboard" className={getLinkStyle("/dashboard")}>
            Dashboard
          </Link>
        </div>

        {/* RIGHT: Desktop User Info / Auth Button */}
        <div className="hidden min-h-[40px] items-center space-x-4 md:flex">
          {isPending ? null : session ? (
            <div className="flex items-center gap-3">
              <div className="flex flex-col text-right">
                <span className="text-sm font-semibold text-gray-900">
                  {session.user.name}
                </span>
                <span className="text-xs text-gray-500">
                  {session.user.email}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-200"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* MOBILE: Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="p-2 text-gray-600 hover:text-gray-900 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE: Dropdown Menu */}
      {isMenuOpen && (
        <div className="flex flex-col space-y-4 border-t px-4 py-4 md:hidden">
          <Link href="/" className={getLinkStyle("/")}>
            Home
          </Link>
          <Link href="/dashboard" className={getLinkStyle("/dashboard")}>
            Dashboard
          </Link>

          <div className="border-t pt-3">
            {isPending ? null : session ? (
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-semibold text-gray-900">
                  {session.user.name}
                </span>
                <span className="text-xs text-gray-500">
                  {session.user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="w-full rounded-md bg-gray-100 px-3 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="block rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}