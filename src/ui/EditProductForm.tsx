"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const inputClass =
    "mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900";
const labelClass = "block text-sm font-medium text-gray-700";

export default function EditProductForm({ product }: { product: Product }) {
    const router = useRouter();

    // One state object holds all the form fields
    const [form, setForm] = useState({
        name: product.name,
        price: String(product.price),
        stock: String(product.stock),
        category: product.category,
        image: product.image,
        isActive: product.isActive,
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Runs on every keystroke. The input's "name" says which field to change.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Send the changes to Express
        const res = await fetch(`${baseUrl}/api/products/${product._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                price: Number(form.price), // inputs give text, the database needs numbers
                stock: Number(form.stock),
            }),
        });

        setLoading(false);

        if (!res.ok) {
            setError("Failed to update product.");
            return;
        }

        // Go back to the details page and reload its data
        router.push(`/dashboard/products/${product._id}`);
        router.refresh();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
        >
            <div>
                <label className={labelClass}>Name</label>
                <input name="name" value={form.name} onChange={handleChange} className={inputClass} required />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label className={labelClass}>Price</label>
                    <input name="price" type="number" step="0.01" min="0" value={form.price} onChange={handleChange} className={inputClass} required />
                </div>
                <div>
                    <label className={labelClass}>Stock</label>
                    <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} className={inputClass} required />
                </div>
            </div>

            <div>
                <label className={labelClass}>Category</label>
                <input name="category" value={form.category} onChange={handleChange} className={inputClass} required />
            </div>

            <div>
                <label className={labelClass}>Image URL</label>
                <input name="image" value={form.image} onChange={handleChange} className={inputClass} />
            </div>

            <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <input name="isActive" type="checkbox" checked={form.isActive} onChange={handleChange} />
                Product is active
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
                {loading ? "Saving..." : "Save changes"}
            </button>
        </form>
    );
}