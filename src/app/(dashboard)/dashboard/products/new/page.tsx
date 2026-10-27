import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AddProductForm from "@/ui/AddProductForm";

export default function AddProductPage() {
    return (
        <div className="mx-auto max-w-2xl">
            <Link
                href="/dashboard/products"
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600"
            >
                <ArrowLeft size={16} />
                Back to products
            </Link>

            <h1 className="text-2xl font-bold text-gray-900">Add product</h1>
            <p className="mb-6 mt-1 text-sm text-gray-500">
                Fill in the details to add a new product.
            </p>

            <AddProductForm />
        </div>
    );
}