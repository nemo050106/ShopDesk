import Link from "next/link";
import {
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    Package,
    Wallet,
} from "lucide-react";
import { getProducts } from "@/lib/products";
import {
    formatPrice,
    getInventorySummary,
    sortProducts,
} from "@/lib/product-utils";

export default async function DashboardPage() {
    const products = await getProducts();

    const summary = getInventorySummary(products);
    const recentProducts = sortProducts(products, "createdAt", "desc").slice(0, 5);

    // One object per summary card, so the markup is written only once below
    const cards = [
        {
            title: "Total Products",
            value: summary.totalProducts,
            icon: Package,
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: "Active Products",
            value: summary.activeProducts,
            icon: CheckCircle2,
            color: "bg-emerald-50 text-emerald-600",
        },
        {
            title: "Out of Stock",
            value: summary.outOfStock,
            icon: AlertTriangle,
            color: "bg-rose-50 text-rose-600",
        },
        {
            title: "Stock Value",
            value: formatPrice(summary.totalStockValue),
            icon: Wallet,
            color: "bg-violet-50 text-violet-600",
        },
    ];

    return (
        <div>
            {/* Page title */}
            <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
            <p className="mt-1 text-sm text-gray-500">
                A quick look at your inventory.
            </p>

            {/* Summary cards */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.title}
                            className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    {card.title}
                                </p>
                                <p className="mt-2 text-2xl font-bold text-gray-900">
                                    {card.value}
                                </p>
                            </div>

                            <div
                                className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}
                            >
                                <Icon size={22} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent products */}
            <div className="mt-8 rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <h2 className="text-lg font-bold text-gray-900">Recent Products</h2>
                    <Link
                        href="/dashboard/products"
                        className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        View all <ArrowRight size={16} />
                    </Link>
                </div>

                {recentProducts.length === 0 && (
                    <p className="p-6 text-sm text-gray-500">No products yet.</p>
                )}

                <div className="divide-y divide-gray-100">
                    {recentProducts.map((product) => (
                        <div
                            key={product._id}
                            className="flex items-center justify-between gap-4 px-6 py-4 transition hover:bg-gray-50"
                        >
                            <div className="flex min-w-0 items-center gap-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-12 w-12 shrink-0 rounded-xl object-cover"
                                />
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-gray-900">
                                        {product.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {product.category} ·{" "}
                                        {new Date(product.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-4">
                                <span
                                    className={`hidden rounded-full px-2.5 py-1 text-xs font-medium sm:inline ${
                                        product.isActive
                                            ? "bg-emerald-50 text-emerald-700"
                                            : "bg-gray-100 text-gray-500"
                                    }`}
                                >
                                    {product.isActive ? "Active" : "Inactive"}
                                </span>
                                <p className="w-24 text-right text-sm font-bold text-gray-900">
                                    {formatPrice(product.price)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}