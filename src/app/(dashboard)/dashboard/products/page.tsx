// 'use client'
import DashboardCards from "@/components/DashboardCards";
import { getProducts } from "@/lib/products";
import Card from "@/ui/Card";

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <DashboardCards products={products}></DashboardCards>
    );
}