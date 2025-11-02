"use client"

import type React from "react"

import Link from "next/link"
import { ShoppingCart, LogOut, Search } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { products } from "@/lib/products"

export default function Navbar() {
  const { cart } = useCart()
  const { user, logout } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredResults, setFilteredResults] = useState<typeof products>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredResults(results)
    } else {
      setFilteredResults([])
    }
  }, [searchQuery])

  const handleSearchSelect = (productId: string) => {
    router.push(`/product/${productId}`)
    setSearchQuery("")
    setShowDropdown(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`)
      setShowDropdown(false)
    }
  }

  return (
    <nav className="bg-secondary text-secondary-foreground sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-6">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary whitespace-nowrap">
            TrendTrove
          </Link>

          {/* Search Bar with Dropdown */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm relative">
            <div className="flex w-full bg-background rounded-lg border border-border overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowDropdown(true)
                }}
                onFocus={() => searchQuery && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                placeholder="Search products..."
                className="flex-1 px-4 py-2 bg-background text-foreground focus:outline-none"
              />
              <button type="submit" className="px-4 text-primary hover:bg-primary/10 transition">
                <Search size={18} />
              </button>
            </div>

            {/* Search Dropdown */}
            {showDropdown && filteredResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                {filteredResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSearchSelect(product.id)}
                    className="w-full text-left px-4 py-3 hover:bg-primary/10 transition flex items-center gap-3 border-b border-border last:border-b-0"
                  >
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">${product.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </form>

          {/* Cart and Auth */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative hover:text-primary transition">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm">{user.name}</span>
                <Button
                  onClick={logout}
                  variant="ghost"
                  size="sm"
                  className="text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                >
                  <LogOut size={18} />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-primary text-primary-foreground hover:bg-yellow-500">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
