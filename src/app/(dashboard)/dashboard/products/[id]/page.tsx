import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    Calendar,
    ChevronRight,
    Hash,
    Package,
    Pencil,
    Tag,
    Wallet,
} from "lucide-react";
import { formatPrice } from "@/lib/product-utils";
import getProductById from "@/lib/productDetails";

export default async function Details({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const product = await getProductById({ id });

    if (!product) notFound();

    // Decide the stock message and its colors in one place
    const stockStatus =
        product.stock === 0
            ? { label: "Out of stock", style: "bg-rose-50 text-rose-700 border-rose-200" }
            : product.stock <= 10
              ? { label: `Low stock: only ${product.stock} left`, style: "bg-amber-50 text-amber-700 border-amber-200" }
              : { label: `In stock: ${product.stock} units available`, style: "bg-emerald-50 text-emerald-700 border-emerald-200" };

    // One object per detail box, so the markup is written only once below
    const details = [
        {
            label: "Category",
            value: product.category,
            icon: Tag,
            color: "bg-blue-50 text-blue-600",
        },
        {
            label: "Units in stock",
            value: product.stock,
            icon: Package,
            color: "bg-violet-50 text-violet-600",
        },
        {
            label: "Stock value",
            value: formatPrice(product.price * product.stock),
            icon: Wallet,
            color: "bg-emerald-50 text-emerald-600",
        },
        {
            label: "Added on",
            value: new Date(product.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
            icon: Calendar,
            color: "bg-amber-50 text-amber-600",
        },
    ];

    return (
        <div>
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500">
                <Link href="/dashboard" className="hover:text-blue-600">
                    Dashboard
                </Link>
                <ChevronRight size={14} />
                <Link href="/dashboard/products" className="hover:text-blue-600">
                    Products
                </Link>
                <ChevronRight size={14} />
                <span className="line-clamp-1 font-medium text-gray-900">
                    {product.name}
                </span>
            </nav>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* LEFT: Image */}
                <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-3 shadow-sm">
                    <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Active / Inactive badge on the image */}
                    <span
                        className={`absolute left-6 top-6 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold shadow backdrop-blur ${
                            product.isActive ? "text-emerald-600" : "text-gray-500"
                        }`}
                    >
                        <span className="h-2 w-2 rounded-full bg-current" />
                        {product.isActive ? "Active" : "Inactive"}
                    </span>
                </div>

                {/* RIGHT: Info */}
                <div className="flex flex-col">
                    <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
                        {product.category}
                    </span>

                    <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        {product.name}
                    </h1>

                    <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                        <Hash size={12} />
                        {product._id}
                    </p>

                    <p className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-extrabold text-transparent">
                        {formatPrice(product.price)}
                    </p>

                    {/* Stock status banner */}
                    <div
                        className={`mt-6 rounded-xl border px-4 py-3 text-sm font-medium ${stockStatus.style}`}
                    >
                        {stockStatus.label}
                    </div>

                    {/* Detail boxes */}
                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {details.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.label}
                                    className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                                >
                                    <div
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                                    >
                                        <Icon size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500">{item.label}</p>
                                        <p className="truncate text-sm font-bold text-gray-900">
                                            {item.value}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Action buttons */}
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Link
                            href={`/dashboard/products/${product._id}/edit`}
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-500/25 transition hover:opacity-90"
                        >
                            <Pencil size={16} />
                            Edit product
                        </Link>

                        <Link
                            href="/dashboard/products"
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
                        >
                            <ArrowLeft size={16} />
                            Back to products
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}