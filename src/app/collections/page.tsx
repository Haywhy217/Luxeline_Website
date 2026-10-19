import Image from 'next/image'
import Link from 'next/link'
import { categories } from '@/data/products'

const CollectionsPage = () => {
  return (
    <main className="pb-16">
      <section className="relative isolate flex min-h-[420px] items-end overflow-hidden bg-stone-900 md:min-h-[520px]">
        <Image
          src="/summer.jpg"
          alt="LuxeLine seasonal fashion collection"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-black/35" />
        <div className="w-full px-6 pb-10 md:px-12 md:pb-14 lg:px-20">
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold text-white md:text-6xl">Collections</h1>
          <p className ="text-s uppercase tracking-[0.25em] text-white/80" >Style that speaks for itself </p>
          <p className="mt-4 max-w-lg text-base leading-7 text-white/90 md:text-lg">
            Everyday pieces, thoughtfully chosen for wherever the day takes you.
          </p>
          <Link
            href="/list"
            className="mt-7 inline-flex border-b border-white pb-2 text-sm font-medium text-white transition-opacity hover:opacity-75"
          >
            Shop all pieces
          </Link>
        </div>
      </section>

      <section className="px-4 pt-14 md:px-8 md:pt-20 lg:px-16 xl:px-32 2xl:px-64">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-rose-500">Explore the edit</p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-800 md:text-3xl">Shop by category</h2>
          </div>
          <Link href="/list" className="hidden text-sm text-stone-600 underline underline-offset-4 sm:block">
            View everything
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.id} href="/list" className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-2 border-b border-stone-300 pb-3">
                <h3 className="font-medium text-stone-800">{category.name}</h3>
                <span aria-hidden="true" className="text-stone-500 transition-transform group-hover:translate-x-1">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export default CollectionsPage