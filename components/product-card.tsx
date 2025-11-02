"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"

interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const { user } = useAuth()

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login first")
      return
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    alert("Added to cart!")
  }

  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition">
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="block relative h-64 bg-muted">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground hover:text-primary transition truncate">{product.name}</h3>
        </Link>

        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-foreground">${product.price.toFixed(2)}</span>
          <Button
            onClick={handleAddToCart}
            className="bg-primary text-primary-foreground hover:bg-yellow-500"
            size="sm"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
