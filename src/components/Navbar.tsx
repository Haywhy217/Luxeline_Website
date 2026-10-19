import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import Image from 'next/image'
import SearchBar from './SearchBar'
import NavIcons from './NavIcons'

const Navbar = () => {
  return (
    <div className="relative z-20 h-20 border-b border-stone-200 bg-white px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-20">
      <div className="flex h-full items-center justify-between lg:hidden">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="logo" width={27} height={27} />
          <div className="text-2xl tracking-[0.2em]">LuxeLine</div>
        </Link>
        <Menu />
      </div>

      <div className="hidden h-full items-center justify-between gap-5 lg:flex">
        <div className="flex min-w-0 shrink-0 items-center gap-5">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image src="/logo.png" alt="logo" width={24} height={24} />
            <div className="text-2xl tracking-[0.2em]">LuxeLine</div>
          </Link>

          <div className="flex items-center gap-3 whitespace-nowrap text-xs text-stone-600 xl:gap-4 xl:text-sm">
            <Link href="/">Home</Link>
            <Link href="/list">Shop</Link>
            <Link href="/collections">Collections</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-4 xl:gap-6">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  )
}

export default Navbar