"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroBanner from "@/components/hero-banner"
import FeaturedProducts from "@/components/featured-products"
import ShopByCategory from "@/components/shop-by-category"
import RecommendedProducts from "@/components/recommended-products"
import { CartProvider } from "@/context/cart-context"
import { AuthProvider } from "@/context/auth-context"

export default function Home() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
          <main className="flex-1">
            <HeroBanner />
            <FeaturedProducts />
            <ShopByCategory />
            <RecommendedProducts />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}
