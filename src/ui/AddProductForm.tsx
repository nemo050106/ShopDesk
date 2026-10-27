"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const inputClass =
    "mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900";
const labelClass = "block text-sm font-medium text-gray-700";

export default function AddProductForm() {
    const router = useRouter();

    // One state object holds all the form fields, starting empty
    const [form, setForm] = useState({
        name: "",
        price: "",
        stock: "",
        category: "",
        image: "",
        isActive: true,
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Runs on every keystroke. The input's "name" says which field to change.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${baseUrl}/api/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    price: Number(form.price), // inputs give text, the database needs numbers
                    stock: Number(form.stock),
                }),
            });

            // Express answered with an error: show its message
            if (!res.ok) {
                const data = await res.json().catch(() => null);
                setError(data?.message ?? "Failed to add product.");
                return;
            }

            // Success: go to the products list and reload its data
            router.push("/dashboard/products");
            router.refresh();
        } catch {
            // fetch itself failed: server off, wrong URL, or blocked by CORS
            setError("Could not reach the server. Is Express running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
        >
            <div>
                <label htmlFor="name" className={labelClass}>Name</label>
                <input id="name" name="name" value={form.name} onChange={handleChange} className={inputClass} required />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="price" className={labelClass}>Price</label>
                    <input id="price" name="price" type="number" step="0.01" min="0" value={form.price} onChange={handleChange} className={inputClass} required />
                </div>
                <div>
                    <label htmlFor="stock" className={labelClass}>Stock</label>
                    <input id="stock" name="stock" type="number" min="0" step="1" value={form.stock} onChange={handleChange} className={inputClass} required />
                </div>
            </div>

            <div>
                <label htmlFor="category" className={labelClass}>Category</label>
                <input id="category" name="category" value={form.category} onChange={handleChange} className={inputClass} placeholder="Electronics" required />
            </div>

            <div>
                <label htmlFor="image" className={labelClass}>Image URL</label>
                <input id="image" name="image" value={form.image} onChange={handleChange} className={inputClass} placeholder="https://picsum.photos/seed/product1/400/400" required />
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
                {loading ? "Adding..." : "Add product"}
            </button>
        </form>
    );
}