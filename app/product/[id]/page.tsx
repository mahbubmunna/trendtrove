"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { products } from "@/lib/products"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowLeft } from "lucide-react"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = products.find((p) => p.id === productId)
  const { addToCart } = useCart()
  const { user } = useAuth()
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl text-muted-foreground">Product not found</p>
        </div>
        <Footer />
      </div>
    )
  }

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
      quantity,
    })
    alert("Added to cart!")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Back Link */}
        <Link href="/" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft size={20} />
          Back to products
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="flex items-center justify-center bg-muted rounded-lg h-96">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">{product.name}</h1>
            <p className="text-lg text-muted-foreground mb-6">{product.description}</p>

            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">Price</p>
              <p className="text-3xl font-bold text-foreground">${product.price.toFixed(2)}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3">Quantity</p>
              <div className="flex items-center border border-border rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-muted transition"
                >
                  −
                </button>
                <span className="px-6 py-2 font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-muted transition">
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="bg-primary text-primary-foreground hover:bg-yellow-500 py-6 text-lg font-semibold w-full"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
