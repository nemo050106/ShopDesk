'use client'
import { Product } from '@/lib/types'
import Card from '@/ui/Card'
import React from 'react'

interface ProductListProps {
  products: Product[];
}

export default function DashboardCards({ products }: ProductListProps) {
    return (
        <div>
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {products.length}
                </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
                Everything in your inventory.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                    <Card key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}
