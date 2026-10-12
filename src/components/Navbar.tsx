import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import Image from 'next/image'
import SearchBar from './SearchBar'
import NavIcons from './NavIcons'

const Navbar = () => {
  return (
    <div className="relative h-20 border-b border-stone-200 bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="flex h-full items-center justify-between md:hidden">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="logo" width={27} height={27} />
          <div className="text-2xl tracking-[0.2em]">LuxeLine</div>
        </Link>
        <Menu />
      </div>

      <div className="hidden h-full items-center justify-between gap-8 md:flex">
        <div className="flex w-1/3 items-center gap-12 xl:w-1/2">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="logo" width={24} height={24} />
            <div className="text-2xl tracking-[0.2em]">LuxeLine</div>
          </Link>

          <div className="hidden gap-5 text-sm text-stone-600 xl:flex">
            <Link href="/">Home</Link>
            <Link href="/list">Shop</Link>
            <Link href="/list">Collections</Link>
            <Link href="/list">Journal</Link>
            <Link href="/list">Contact</Link>
          </div>
        </div>

        <div className="flex w-2/3 items-center justify-center gap-8 xl:w-1/2">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  )
}

export default Navbar