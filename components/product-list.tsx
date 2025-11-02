"use client"

import { useSearchParams } from "next/navigation"
import ProductCard from "./product-card"
import { products } from "@/lib/products"

export default function ProductList() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search")?.toLowerCase() || ""

  const filteredProducts = searchQuery
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery) || product.description.toLowerCase().includes(searchQuery),
      )
    : products

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          {searchQuery ? `Search results for "${searchQuery}"` : "Shop our collection"}
        </h1>
        <p className="text-muted-foreground">
          {filteredProducts.length === 0
            ? "No products found matching your search"
            : `Discover our ${searchQuery ? "matching" : "premium"} selection of products`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
