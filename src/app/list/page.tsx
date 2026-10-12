import React from 'react'
import ProductList from '@/components/ProductList'

const ListPage = () => {
  return (
    <div className="px-4 py-16 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-rose-500">Modern essentials</p>
        <h1 className="mt-3 text-4xl font-semibold text-stone-800">Shop All Products</h1>
      </div>

      <ProductList />
    </div>
  )
}

export default ListPage