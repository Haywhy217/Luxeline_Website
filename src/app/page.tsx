"use client"

import CategoryList from "@/components/CategoryList"
import ProductList from "@/components/ProductList"
import Slider from "@/components/Slider"

const HomePage = () => {
  return (
    <div className="bg-[#fffaf7] text-stone-800">
      <Slider />

      <div className="mt-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-rose-500">New arrivals</p>
            <h1 className="text-3xl font-semibold md:text-4xl">Featured Products</h1>
          </div>
          <a href="/list" className="text-sm font-medium text-stone-700 underline underline-offset-4">
            View all
          </a>
        </div>
        <ProductList />
      </div>

      <div className="mt-24 bg-white px-4 py-20 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-500">Shop by style</p>
          <h2 className="text-3xl font-semibold md:text-4xl">Categories</h2>
        </div>
        <CategoryList />
      </div>
    </div>
  )
}

export default HomePage