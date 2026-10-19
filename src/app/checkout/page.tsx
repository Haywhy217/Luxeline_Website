'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/components/CartProvider'

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL

const CheckoutPage = () => {
  const { items, subtotal } = useCart()
  const [status, setStatus] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!contactEmail) {
      setStatus('Checkout email is not configured yet. Please contact the store directly.')
      return
    }

    const formData = new FormData(event.currentTarget)
    const customer = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      address: String(formData.get('address') ?? ''),
    }
    const orderLines = items.map((item) =>
      `${item.name} x ${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`,
    ).join('\n')
    const subject = encodeURIComponent('LuxeLine order request')
    const body = encodeURIComponent(
      `Order request\n\nName: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone || 'Not provided'}\nShipping address: ${customer.address}\n\nItems:\n${orderLines}\n\nSubtotal: $${subtotal.toFixed(2)}\n\nPlease confirm availability, shipping, and payment options.`,
    )

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
    setStatus('Your email app should open with the order request. Review it and send the email to submit; no payment is processed on this site.')
  }

  return (
    <main className="px-4 py-14 md:px-8 md:py-20 lg:px-16 xl:px-32 2xl:px-64">
      <p className="text-xs uppercase tracking-[0.25em] text-rose-500">Almost there</p>
      <h1 className="mt-3 text-4xl font-semibold text-stone-800">Checkout</h1>

      {items.length === 0 ? (
        <div className="mt-10 border-y border-stone-200 py-10">
          <p className="text-stone-600">There are no items to check out.</p>
          <Link href="/list" className="mt-5 inline-block bg-stone-900 px-5 py-3 text-sm font-medium text-white hover:bg-stone-700">Browse products</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-stone-800">Contact and delivery</h2>
              <p className="mt-2 text-sm leading-6 text-stone-500">Your order request will open in your email app for you to review and send.</p>
            </div>
            <div>
              <label htmlFor="checkout-name" className="mb-2 block text-sm font-medium text-stone-800">Full name</label>
              <input id="checkout-name" name="name" autoComplete="name" required className="w-full border border-stone-300 bg-white px-3 py-3 text-sm outline-none focus:border-stone-700" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="checkout-email" className="mb-2 block text-sm font-medium text-stone-800">Email</label>
                <input id="checkout-email" name="email" type="email" autoComplete="email" required className="w-full border border-stone-300 bg-white px-3 py-3 text-sm outline-none focus:border-stone-700" />
              </div>
              <div>
                <label htmlFor="checkout-phone" className="mb-2 block text-sm font-medium text-stone-800">Phone <span className="font-normal text-stone-500">(optional)</span></label>
                <input id="checkout-phone" name="phone" type="tel" autoComplete="tel" className="w-full border border-stone-300 bg-white px-3 py-3 text-sm outline-none focus:border-stone-700" />
              </div>
            </div>
            <div>
              <label htmlFor="checkout-address" className="mb-2 block text-sm font-medium text-stone-800">Shipping address</label>
              <textarea id="checkout-address" name="address" autoComplete="street-address" rows={3} required className="w-full resize-y border border-stone-300 bg-white px-3 py-3 text-sm outline-none focus:border-stone-700" />
            </div>
            {!contactEmail && <p className="text-sm text-rose-700">Set NEXT_PUBLIC_CONTACT_EMAIL in your environment to enable email checkout.</p>}
            <button type="submit" className="bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-700">Prepare order email</button>
            {status && <p role="status" className="text-sm leading-6 text-stone-600">{status}</p>}
          </form>

          <aside className="h-fit border-t border-stone-200 pt-6 lg:border-0 lg:pt-0">
            <h2 className="text-lg font-medium text-stone-800">Order summary</h2>
            <div className="mt-5 divide-y divide-stone-200 border-y border-stone-200">
              {items.map((item) => (
                <div key={item.slug} className="flex justify-between gap-4 py-4 text-sm">
                  <span className="min-w-0 break-words text-stone-600">{item.name} <span className="text-stone-400">× {item.quantity}</span></span>
                  <span className="shrink-0 font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-between font-medium">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <p className="mt-4 text-xs leading-5 text-stone-500">Shipping and payment will be confirmed by the store. No payment is taken here.</p>
          </aside>
        </div>
      )}
    </main>
  )
}

export default CheckoutPage