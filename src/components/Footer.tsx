import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-white px-4 py-10 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-2xl tracking-[0.2em] text-stone-800">LuxeLine</div>
          <p className="mt-2 text-sm text-stone-600">Modern essentials for everyday confidence.</p>
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-stone-600">
          <Link href="/">Home</Link>
          <Link href="/list">Shop</Link>
          <Link href="/list">New Arrivals</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer