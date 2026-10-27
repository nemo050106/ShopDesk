import { getProducts } from "@/lib/products";
import Card from "@/ui/Card";
import Link from "next/link";

export default async function Hero() {
    const products = await getProducts();
    const featuredProducts = products.slice(0, 10);

    return (
        <section className="bg-gradient-to-b from-blue-50 to-white px-4 py-16 md:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Hero Title & Subtitle */}
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
                        New Arrivals
                    </span>
                    <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                        Discover Top Products on{" "}
                        <span className="text-blue-600">ShopDesk</span>
                    </h1>
                    <p className="mt-4 text-base text-gray-600 sm:text-lg">
                        Explore our curated selection of high-quality electronics,
                        kitchen items, fashion, and furniture.
                    </p>
                    <div className="mt-6 flex justify-center gap-4">
                        <Link
                            href="/dashboard"
                            className="rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                        >
                            Go to Dashboard
                        </Link>
                    </div>
                </div>

                {/* Featured Products Grid */}
                <div>
                    <h2 className="mb-6 text-xl font-bold text-gray-900">
                        Featured Products Preview
                    </h2>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        {featuredProducts.map((product) => (
                            <Card key={product._id} product={product}></Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}