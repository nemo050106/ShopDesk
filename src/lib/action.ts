"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { Product } from "@/lib/types";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// The fields the edit form can change
export type ProductInput = Omit<Product, "_id" | "createdAt">;

export async function updateProduct(
    id: string,
    input: ProductInput,
): Promise<{ success: boolean; error?: string }> {
    // Only signed-in users can edit
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        return { success: false, error: "You must be signed in." };
    }

    const res = await fetch(`${baseUrl}/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });

    if (!res.ok) {
        const body = await res.json().catch(() => null);
        return {
            success: false,
            error: body?.message ?? "Failed to update product.",
        };
    }

    // Make Next.js reload pages that show this product
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/products");
    revalidatePath(`/dashboard/products/${id}`);

    return { success: true };
}