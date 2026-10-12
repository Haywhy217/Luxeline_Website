import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { categories } from '@/data/products'

const CategoryList = () => {
  return (
    <div className="flex flex-wrap gap-6">
      {categories.map((category) => (
        <Link
          href="/list"
          key={category.id}
          className="group flex w-full flex-col gap-3 rounded-3xl border border-stone-200 bg-stone-50 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:w-[48%] lg:w-[23%]"
        >
          <div className="relative h-52 overflow-hidden rounded-2xl bg-stone-100">
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="25vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-stone-800">{category.name}</span>
            <span className="text-sm text-stone-500">Shop now</span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CategoryList
