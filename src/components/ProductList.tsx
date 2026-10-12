'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

type StoreProduct = {
  id: number
  slug: string
  name: string
  price: number
  category: string
  description: string
  image_url: string
  hover_image_url?: string | null
}

const ProductList = () => {
  const [products, setProducts] = useState<StoreProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching products:', error.message)
        setProducts([])
        setLoading(false)
        return
      }

      setProducts(data ?? [])
      setLoading(false)
    }

    loadProducts()
  }, [])

  if (loading) {
    return <div className="mt-8 text-sm text-stone-500">Loading products...</div>
  }

  if (!products.length) {
    return <div className="mt-8 text-sm text-stone-500">No products available yet.</div>
  }

  return (
    <div className="mt-8 flex flex-wrap justify-between gap-x-6 gap-y-12">
      {products.map((product) => {
        const hoverImage = product.hover_image_url || product.image_url

        return (
          <Link
            href={`/${product.slug}`}
            key={product.id}
            className="group flex w-full flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          >
            <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-stone-100">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                sizes="25vw"
                className="absolute object-cover transition-opacity duration-500 group-hover:opacity-0"
              />
              <Image
                src={hoverImage}
                alt={`${product.name} hover`}
                fill
                sizes="25vw"
                className="absolute object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{product.category}</p>
                <span className="font-medium text-stone-800">{product.name}</span>
              </div>
              <span className="font-semibold text-stone-800">${product.price}</span>
            </div>

            <div className="text-sm leading-6 text-stone-600">{product.description}</div>

            <button className="w-max rounded-full border border-stone-300 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-stone-800 transition hover:bg-stone-900 hover:text-white">
              Add to Cart
            </button>
          </Link>
        )
      })}
    </div>
  )
}

export default ProductList
