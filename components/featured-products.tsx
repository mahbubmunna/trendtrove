"use client"

import { products } from "@/lib/products"
import ProductCard from "./product-card"

export default function FeaturedProducts() {
  const featuredProducts = products.slice(0, 6)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-3">Featured Products</h2>
        <p className="text-lg text-muted-foreground">Handpicked bestsellers from our premium collection</p>
        <div className="flex justify-center mt-4">
          <div className="h-1 w-16 bg-primary rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
