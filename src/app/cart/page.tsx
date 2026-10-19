'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/CartProvider'

const CartPage = () => {
  const { items, subtotal, setQuantity, removeItem } = useCart()

  return (
    <main className="px-4 py-14 md:px-8 md:py-20 lg:px-16 xl:px-32 2xl:px-64">
      <p className="text-xs uppercase tracking-[0.25em] text-rose-500">Your selection</p>
      <h1 className="mt-3 text-4xl font-semibold text-stone-800">Shopping cart</h1>

      {items.length === 0 ? (
        <div className="mt-10 border-y border-stone-200 py-10">
          <p className="text-stone-600">Your cart is empty.</p>
          <Link href="/list" className="mt-5 inline-block bg-stone-900 px-5 py-3 text-sm font-medium text-white hover:bg-stone-700">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="divide-y divide-stone-200 border-y border-stone-200">
            {items.map((item) => (
              <article key={item.slug} className="grid grid-cols-[5rem_minmax(0,1fr)] gap-4 py-6 sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:gap-6">
                <Link href={`/${item.slug}`} className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                  <Image src={item.image_url} alt={item.name} fill sizes="112px" className="object-cover" />
                </Link>
                <div className="flex min-w-0 flex-col justify-between gap-5">
                  <div>
                    <Link href={`/${item.slug}`} className="min-w-0 break-words font-medium text-stone-800 hover:underline">{item.name}</Link>
                    <p className="mt-1 text-sm text-stone-500">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center border border-stone-300" aria-label={`Quantity for ${item.name}`}>
                      <button type="button" onClick={() => setQuantity(item.slug, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`} className="h-9 w-9 text-stone-700 hover:bg-stone-100">-</button>
                      <span className="min-w-8 text-center text-sm" aria-live="polite">{item.quantity}</span>
                      <button type="button" onClick={() => setQuantity(item.slug, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`} className="h-9 w-9 text-stone-700 hover:bg-stone-100">+</button>
                    </div>
                    <button type="button" onClick={() => removeItem(item.slug)} className="text-sm text-stone-500 underline underline-offset-4 hover:text-stone-900">Remove</button>
                  </div>
                </div>
                <p className="col-start-2 font-medium text-stone-800 sm:col-start-3 sm:row-start-1">${(item.price * item.quantity).toFixed(2)}</p>
              </article>
            ))}
          </div>

          <aside className="h-fit border-t border-stone-200 pt-6 lg:border-0 lg:pt-0">
            <h2 className="text-lg font-medium text-stone-800">Order summary</h2>
            <div className="mt-5 flex justify-between border-b border-stone-200 pb-5 text-sm">
              <span className="text-stone-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-stone-500">Shipping and payment are arranged with the store after you send your order request.</p>
            <Link href="/checkout" className="mt-6 block bg-stone-900 px-5 py-3 text-center text-sm font-medium text-white hover:bg-stone-700">
              Continue to checkout
            </Link>
            <Link href="/list" className="mt-4 block text-center text-sm text-stone-600 underline underline-offset-4">Continue shopping</Link>
          </aside>
        </div>
      )}
    </main>
  )
}

export default CartPage