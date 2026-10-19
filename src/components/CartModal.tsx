
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from './CartProvider'

const CartModal = ({ onClose }: { onClose: () => void }) => {
  const { items, subtotal, setQuantity, removeItem } = useCart()

  return (
    <div role="dialog" aria-label="Shopping cart" className="absolute right-0 top-12 z-30 flex max-h-[calc(100vh-6rem)] w-[min(22rem,calc(100vw-2rem))] flex-col gap-5 overflow-y-auto border border-stone-200 bg-white p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-stone-800">Shopping cart</h2>
        <button type="button" onClick={onClose} aria-label="Close cart" className="h-8 w-8 text-xl text-stone-500 hover:text-stone-900">x</button>
      </div>

      {items.length === 0 ? (
        <div className="border-y border-stone-200 py-6">
          <p className="text-sm text-stone-600">Your cart is empty.</p>
          <Link href="/list" onClick={onClose} className="mt-4 inline-block text-sm underline underline-offset-4">Browse products</Link>
        </div>
      ) : (
        <>
          <div className="space-y-5">
            {items.map((item) => (
              <article key={item.slug} className="flex gap-3">
                <Image src={item.image_url} alt={item.name} width={64} height={80} className="h-20 w-16 object-cover" />
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <h3 className="truncate text-sm font-medium text-stone-800">{item.name}</h3>
                    <p className="mt-1 text-sm text-stone-600">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="inline-flex items-center border border-stone-300">
                      <button type="button" onClick={() => setQuantity(item.slug, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`} className="h-7 w-7 hover:bg-stone-100">-</button>
                      <span className="min-w-6 text-center">{item.quantity}</span>
                      <button type="button" onClick={() => setQuantity(item.slug, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`} className="h-7 w-7 hover:bg-stone-100">+</button>
                    </div>
                    <button type="button" onClick={() => removeItem(item.slug)} className="text-stone-500 underline underline-offset-2">Remove</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="border-t border-stone-200 pt-4">
            <div className="flex justify-between text-sm font-medium text-stone-800">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-stone-500">Shipping and payment are confirmed with the store.</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Link href="/cart" onClick={onClose} className="border border-stone-300 px-3 py-3 text-center hover:bg-stone-50">View cart</Link>
              <Link href="/checkout" onClick={onClose} className="bg-stone-900 px-3 py-3 text-center text-white hover:bg-stone-700">Checkout</Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CartModal