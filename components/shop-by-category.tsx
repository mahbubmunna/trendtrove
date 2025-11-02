"use client"

import Link from "next/link"

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    icon: "📱",
    color: "from-blue-500 to-blue-600",
    description: "Latest gadgets and devices",
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: "👗",
    color: "from-pink-500 to-pink-600",
    description: "Trendy clothing and accessories",
  },
  {
    id: "home",
    name: "Home",
    icon: "🏠",
    color: "from-amber-500 to-amber-600",
    description: "Furniture and home decor",
  },
  {
    id: "beauty",
    name: "Beauty",
    icon: "💄",
    color: "from-purple-500 to-purple-600",
    description: "Skincare and cosmetics",
  },
]

export default function ShopByCategory() {
  return (
    <section id="categories" className="bg-secondary/5 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-3">Shop by Category</h2>
          <p className="text-lg text-muted-foreground">Find exactly what you're looking for</p>
          <div className="flex justify-center mt-4">
            <div className="h-1 w-16 bg-primary rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/?category=${category.id}`}>
              <div
                className={`bg-gradient-to-br ${category.color} rounded-xl p-8 text-white cursor-pointer 
                transform transition-all duration-300 hover:scale-105 hover:shadow-xl h-full flex flex-col justify-between`}
              >
                <div>
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white/90">{category.description}</p>
                </div>
                <div className="mt-4 inline-block">
                  <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">Explore</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
