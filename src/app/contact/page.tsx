'use client'

import { FormEvent, useState } from 'react'

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL

const ContactPage = () => {
  const [status, setStatus] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!contactEmail) {
      setStatus('Our contact form is not connected yet. Please try again later.')
      return
    }

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '')
    const email = String(formData.get('email') ?? '')
    const orderNumber = String(formData.get('orderNumber') ?? '')
    const message = String(formData.get('message') ?? '')
    const subject = encodeURIComponent(`LuxeLine contact from ${name}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nOrder number: ${orderNumber || 'Not provided'}\n\n${message}`,
    )

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
    setStatus('Your email app should open with your message ready to send.')
  }

  return (
    <main className="px-4 py-14 md:px-8 md:py-20 lg:px-16 xl:px-32 2xl:px-64">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-rose-500">We are here to help</p>
        <h1 className="mt-3 text-4xl font-semibold text-stone-800">Contact us</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600">
          Send us a note about a product or order. We’ll get back to you as soon as we can.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-stone-800">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="w-full border border-stone-300 bg-white px-3 py-3 text-sm text-stone-800 outline-none focus:border-stone-700"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-stone-800">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full border border-stone-300 bg-white px-3 py-3 text-sm text-stone-800 outline-none focus:border-stone-700"
              />
            </div>
          </div>

          <div>
            <label htmlFor="orderNumber" className="mb-2 block text-sm font-medium text-stone-800">
              Order number <span className="font-normal text-stone-500">(optional)</span>
            </label>
            <input
              id="orderNumber"
              name="orderNumber"
              type="text"
              className="w-full border border-stone-300 bg-white px-3 py-3 text-sm text-stone-800 outline-none focus:border-stone-700"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-stone-800">Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="w-full resize-y border border-stone-300 bg-white px-3 py-3 text-sm text-stone-800 outline-none focus:border-stone-700"
            />
          </div>

          <div className="flex flex-col items-start gap-3">
            <button
              type="submit"
              className="bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-700"
            >
              Send message
            </button>
            {status && <p role="status" className="text-sm text-stone-600">{status}</p>}
          </div>
        </form>
      </div>
    </main>
  )
}

export default ContactPage