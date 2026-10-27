import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
// import getProductById from "@/lib/getProductById"; 
import EditProductForm from "@/ui/EditProductForm";
import getProductById from "@/lib/productDetails";

export default async function EditProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const product = await getProductById({ id });

    if (!product) notFound();

    return (
        <div className="mx-auto max-w-2xl">
            <Link
                href={`/dashboard/products/${product._id}`}
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600"
            >
                <ArrowLeft size={16} />
                Back to product
            </Link>

            <h1 className="text-2xl font-bold text-gray-900">Edit product</h1>
            <p className="mb-6 mt-1 text-sm text-gray-500">{product.name}</p>

            <EditProductForm product={product} />
        </div>
    );
}