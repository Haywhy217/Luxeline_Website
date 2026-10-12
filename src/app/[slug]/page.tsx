'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

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
    <div className="px-4 py-16 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative h-[500px] overflow-hidden rounded-[2rem] bg-stone-100">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-500">{product.category}</p>
          <h1 className="mt-3 text-4xl font-semibold text-stone-800">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold text-stone-900">${product.price}</p>
          <p className="mt-4 text-sm uppercase tracking-[0.2em] text-stone-500">{product.volume || 'Standard fit'}</p>

          <div className="mt-6 flex gap-4">
            <button className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-white transition hover:bg-stone-700">
              Add to Cart
            </button>
            <Link href="/list" className="rounded-full border border-stone-300 px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-stone-800 transition hover:bg-stone-100">
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