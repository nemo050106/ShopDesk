import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/product-utils";

export default function Card({ product }: { product: Product }) {
    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            {/* Image + badges */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-700 backdrop-blur">
                    {product.category}
                </span>

                {/* Dark overlay when the product is sold out */}
                {product.stock === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-900">
                            Out of stock
                        </span>
                    </div>
                )}
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col p-4">
                <h3
                    className="line-clamp-1 text-sm font-semibold text-gray-900"
                    title={product.name}
                >
                    {product.name}
                </h3>
                <p className="mt-1 text-lg font-bold text-blue-600">
                    {formatPrice(product.price)}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3 text-xs">
                    <span className="text-gray-500">{product.stock} in stock</span>
                    <span
                        className={`flex items-center gap-1.5 font-medium ${
                            product.isActive ? "text-emerald-600" : "text-gray-400"
                        }`}
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {product.isActive ? "Active" : "Inactive"}
                    </span>
                </div>
            </div>
        </div>
    );
}