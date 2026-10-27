import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Sidebar from "@/ui/Sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Only logged-in users can see anything inside (dashboard)
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect("/login");

    const { name, email, image } = session.user;
    const firstName = name.split(" ")[0];

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 md:flex-row">
            <Sidebar />

            <div className="flex min-w-0 flex-1 flex-col">
                {/* Top header: stays visible while scrolling */}
                <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white/80 px-6 backdrop-blur">
                    <p className="text-sm text-gray-500">
                        Welcome back,{" "}
                        <span className="font-semibold text-gray-900">{firstName}</span> 👋
                    </p>

                    <div className="flex items-center gap-3">
                        <div className="hidden text-right sm:block">
                            <p className="text-sm font-semibold leading-tight text-gray-900">
                                {name}
                            </p>
                            <p className="text-xs text-gray-500">{email}</p>
                        </div>

                        {image ? (
                            <img
                                src={image}
                                alt={name}
                                className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-100"
                            />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white ring-2 ring-blue-100">
                                {name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                </header>

                <main className="flex-1 p-6 md:p-8">
                    <div className="mx-auto max-w-6xl">{children}</div>
                </main>
            </div>
        </div>
    );
}