"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import Button from "@/ui/Button";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function DeleteButton({ id, name }: { id: string; name: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleDelete = async () => {
        // Ask first, because a delete can't be undone
        if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;

        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${baseUrl}/api/products/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                setError(data?.message ?? "Failed to delete product.");
                return;
            }

            router.push("/dashboard/products");
            router.refresh();
        } catch {
            setError("Could not reach the server. Is Express running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button variant="danger" onClick={handleDelete} disabled={loading}>
                <Trash2 size={16} />
                {loading ? "Deleting..." : "Delete"}
            </Button>

            {error && <p className="w-full text-sm text-red-600">{error}</p>}
        </>
    );
}