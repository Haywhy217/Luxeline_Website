'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { products as localProducts } from '@/data/products'
import { useCart } from '@/components/CartProvider'

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

const fallbackProducts: StoreProduct[] = localProducts.map((product) => ({
  id: product.id,
  slug: product.slug,
  name: product.name,
  price: product.price,
  category: product.category,
  description: product.description,
  image_url: product.img,
  hover_image_url: product.hoverImg,
}))

const ProductList = () => {
  const { addItem } = useCart()
  const [products, setProducts] = useState<StoreProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching products:', error.message)
          setProducts(fallbackProducts)
          setLoading(false)
          return
        }

        setProducts(data?.length ? data : fallbackProducts)
        setLoading(false)
      } catch (error) {
        console.error('Error loading products:', error)
        setProducts(fallbackProducts)
        setLoading(false)
      }
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
    <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
      {products.map((product) => {
        const hoverImage = product.hover_image_url || product.image_url

        return (
          <article key={product.id} className="flex min-w-0 flex-col gap-3 sm:gap-4">
            <Link href={`/${product.slug}`} className="group flex flex-col gap-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-stone-100 sm:rounded-2xl">
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

            <div className="line-clamp-3 text-xs leading-5 text-stone-600 sm:text-sm sm:leading-6">{product.description}</div>

            </Link>
            <button
              type="button"
              onClick={() => addItem({ id: product.id, slug: product.slug, name: product.name, price: product.price, image_url: product.image_url })}
              className="w-full rounded-full border border-stone-300 px-2 py-2 text-[10px] font-medium uppercase tracking-[0.12em] text-stone-800 transition hover:bg-stone-900 hover:text-white sm:w-max sm:px-4 sm:text-xs sm:tracking-[0.2em]"
            >
              Add to Cart
            </button>
          </article>
        )
      })}
    </div>
  )
}

export default ProductList
