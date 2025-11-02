"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroBanner() {
  return (
    <section className="relative w-full h-96 bg-gradient-to-r from-primary to-primary/80 overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url("/fashion-store-hero-banner.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-4">Discover Premium Trends</h1>
          <p className="text-xl text-secondary/90 mb-8">
            Explore our curated collection of the latest fashion, electronics, and lifestyle products
          </p>
          <div className="flex gap-4">
            <Link href="/?category=all">
              <Button className="bg-secondary text-primary hover:bg-secondary/90 text-lg px-8 py-6">Shop Now</Button>
            </Link>
            <Link href="/#categories">
              <Button
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10 text-lg px-8 py-6 bg-transparent"
              >
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
