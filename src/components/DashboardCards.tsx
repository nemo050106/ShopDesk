'use client'
import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Product } from '@/lib/types'
import {
    filterByCategory,
    filterByPrice,
    getCategories,
    searchProducts,
} from '@/lib/product-utils'
import Card from '@/ui/Card'

interface ProductListProps {
    products: Product[];
}

const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function DashboardCards({ products }: ProductListProps) {
    // One piece of state per control
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("All");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    // Build the dropdown options from the real products
    const categories = getCategories(products);

    // Apply the three filters one after another.
    // This runs on every render, so no useEffect is needed.
    const searched = searchProducts(products, query);
    const inCategory = filterByCategory(searched, category);
    const visibleProducts = filterByPrice(inCategory, minPrice, maxPrice);

    // True when at least one filter is being used
    const hasFilters =
        query !== "" || category !== "All" || minPrice !== "" || maxPrice !== "";

    const clearFilters = () => {
        setQuery("");
        setCategory("All");
        setMinPrice("");
        setMaxPrice("");
    };

    return (
        <div>
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {products.length}
                </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
                Everything in your inventory.
            </p>

            {/* Filter bar */}
            <div className="mt-6 grid gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr]">
                {/* Search */}
                <div className="relative">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search by name or category..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className={`${inputClass} pl-9`}
                    />
                </div>

                {/* Category */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={inputClass}
                >
                    {categories.map((name) => (
                        <option key={name} value={name}>
                            {name === "All" ? "All categories" : name}
                        </option>
                    ))}
                </select>

                {/* Price range */}
                <input
                    type="number"
                    min="0"
                    placeholder="Min price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className={inputClass}
                />
                <input
                    type="number"
                    min="0"
                    placeholder="Max price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className={inputClass}
                />
            </div>

            {/* Result count + clear button */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <p>
                    Showing {visibleProducts.length} of {products.length} products
                </p>

                {hasFilters && (
                    <button
                        onClick={clearFilters}
                        className="flex items-center gap-1 font-medium text-blue-600 hover:text-blue-700"
                    >
                        <X size={14} />
                        Clear filters
                    </button>
                )}
            </div>

            {/* Product grid, or a message when nothing matches */}
            {visibleProducts.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center text-sm text-gray-500">
                    No products match your filters.
                </div>
            ) : (
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {visibleProducts.map((product) => (
                        <Card key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}