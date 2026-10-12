"use client"

import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Menu = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Image
        src="/menu.png"
        alt="menu"
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="absolute left-0 top-20 z-10 flex h-[calc(100vh-80px)] w-full flex-col items-center justify-center gap-8 bg-stone-900 text-xl text-white">
          <Link href="/">Home</Link>
          <Link href="/list">Shop</Link>
          <Link href="/list">Collections</Link>
          <Link href="/list">Journal</Link>
          <Link href="/list">Contact</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      )}
    </div>
  )
}

export default Menu