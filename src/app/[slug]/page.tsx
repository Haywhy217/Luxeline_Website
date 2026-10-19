'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useCart } from '@/components/CartProvider'

type Product = {
  id: number
  slug: string
  name: string
  price: number
  category: string
  description: string
  image_url: string
  hover_image_url?: string | null
  volume?: string | null
}

const ProductPage = () => {
  const params = useParams<{ slug: string }>()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProduct = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', params.slug)
        .single()

      if (error) {
        console.error('Error fetching product:', error.message)
        setProduct(null)
        setLoading(false)
        return
      }

      setProduct(data)
      setLoading(false)
    }

    if (params?.slug) {
      loadProduct()
    }
  }, [params?.slug])

  if (loading) {
    return <main className="px-4 py-16 text-center text-stone-500">Loading product...</main>
  }

  if (!product) {
    return (
      <main className="px-4 py-16 text-center">
        <p className="text-stone-500">Product not found.</p>
        <Link href="/list" className="mt-6 inline-block rounded-full border border-stone-300 px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-stone-800 hover:bg-stone-100">
          Back to shop
        </Link>
      </main>
    )
  }

  return (
    <div className="px-4 py-10 sm:py-14 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-100 sm:rounded-[2rem] lg:aspect-auto lg:h-[min(42rem,50vw)]">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>

        <div className="flex min-w-0 flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-500">{product.category}</p>
          <h1 className="mt-3 break-words text-3xl font-semibold text-stone-800 sm:text-4xl">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold text-stone-900">${product.price}</p>
          <p className="mt-4 text-sm uppercase tracking-[0.2em] text-stone-500">{product.volume || 'Standard fit'}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <button
              type="button"
              onClick={() => addItem({ id: product.id, slug: product.slug, name: product.name, price: product.price, image_url: product.image_url })}
              className="w-full rounded-full bg-stone-900 px-5 py-3 text-center text-sm font-medium uppercase tracking-[0.16em] text-white transition hover:bg-stone-700 sm:w-auto sm:px-6 sm:tracking-[0.2em]"
            >
              Add to Cart
            </button>
            <Link href="/list" className="w-full rounded-full border border-stone-300 px-5 py-3 text-center text-sm font-medium uppercase tracking-[0.16em] text-stone-800 transition hover:bg-stone-100 sm:w-auto sm:px-6 sm:tracking-[0.2em]">
              Continue Shopping
            </Link>
          </div>

          <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-50 p-5">
            <h2 className="text-lg font-medium text-stone-800">Description</h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage