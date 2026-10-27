import Link from "next/link";
import { Plus } from "lucide-react";
import DashboardCards from "@/components/DashboardCards";
import { getProducts } from "@/lib/products";

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div>
            {/* Add product button, right-aligned above the cards */}
            <div className="mb-6 flex justify-end">
                <Link
                    href="/dashboard/products/new"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                >
                    <Plus size={16} />
                    Add product
                </Link>
            </div>

            <DashboardCards products={products} />
        </div>
    );
}