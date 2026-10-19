"use client"

import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from './CartProvider'

const Menu = () => {
  const [open, setOpen] = useState(false)
  const { itemCount } = useCart()

  return (
    <div>
      <button type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen((prev) => !prev)} className="flex h-11 w-11 items-center justify-center">
        <Image src="/menu.png" alt="" width={28} height={28} />
      </button>

      {open && (
        <nav aria-label="Mobile navigation" className="absolute left-0 top-20 z-30 flex h-[calc(100dvh-5rem)] w-full flex-col items-center justify-center gap-6 overflow-y-auto bg-stone-900 px-6 py-8 text-xl text-white sm:gap-8">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/list" onClick={() => setOpen(false)}>Shop</Link>
          <Link href="/collections" onClick={() => setOpen(false)}>Collections</Link>
          <Link href="/journal" onClick={() => setOpen(false)}>Journal</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link href="/cart" onClick={() => setOpen(false)}>Cart ({itemCount})</Link>
          <Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
        </nav>
      )}
    </div>
  )
}

export default Menu