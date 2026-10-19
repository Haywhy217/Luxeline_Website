import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { categories } from '@/data/products'

const CategoryList = () => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {categories.map((category) => (
        <Link
          href="/list"
          key={category.id}
          className="group flex min-w-0 flex-col gap-3 rounded-xl border border-stone-200 bg-stone-50 p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:rounded-2xl sm:p-4"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-stone-100 sm:rounded-xl">
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="25vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-1">
            <span className="text-sm font-medium text-stone-800 sm:text-lg">{category.name}</span>
            <span className="text-xs text-stone-500 sm:text-sm">Shop now</span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CategoryList
