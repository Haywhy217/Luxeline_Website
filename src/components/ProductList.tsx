import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Products = [
    {
        id: 1,
        name: "705 Tees and Long Sleeves",
        price: 25,
        img: "/705 tees.jpg",
        description: "Stay cool and stylish with the 705 Tees & Long Sleeve combo. Made from breathable cotton, it’s the perfect fit for a casual day out or layering in colder weather. Classic cut, clean seams, and a relaxed silhouette for all-day comfort.",
        hoverImg: "/705 teesh.jpg"
    },
    {
        id: 2,
        name: "Addidas Sambas Sneakers",
        price: 85,
        img: "/addidas.jpg",
        description: "The iconic Adidas Sambas deliver heritage style with a modern twist.  The classic three stripes and retro design make them a must-have for any sneakerhead. Step up your game with the Sambas.",
        hoverImg: "/addidashover.jpg"
    },
    {
        id: 3,
        name: " G-Shock Watch",
        price: 110,
        img: "/Gshock.jpg",
        description: "Built tough, the G-Shock Watch is shock-resistant and water-resistant up to 200 meters. With features like LED lighting, stopwatch, alarm, and rugged design, it’s the go-to watch for durability and performance. ",
        hoverImg: "/Gshockhover.jpg"
    },
    {
        id: 4,
        name: "Plain Tees",
        price: 18,
        img: "/plaintees.jpg",
        description: "Elevate your basics with our Plain Tees. Crafted from soft, breathable cotton, these tees are perfect for layering or wearing solo. Available in a variety of colors, they offer a relaxed fit and timeless style for any occasion.",
        hoverImg: "/plainteesh.jpg"
    },
    

]

const ProductList = () => {
  return (
    <div className='flex gap-8 gap-y-16 justify-between flex-wrap mt-12'>
      {Products.map((product => 
      <Link href='/test' key={product.id} className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
      <div className='relative h-80 w-full'>
        <Image
        src={product.img}
        alt='image'
        fill
        sizes='25vw'
        className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500'
        />
        <Image
        src={product.hoverImg}
        alt=' hover image'
        fill
        sizes='25vw'
        className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500 '
        />
        </div>
        <div className='flex justify-between' >
          <span className='font-medium'>{product.name}</span>
          <span className='font-semibold'>${product.price}</span>
        </div>
        <div className='text-sm text-gray-500'>{product.description}</div>
        <button className='rounded-2xl ring-1 ring-ayo text-ayo w-max py-2 px-4 text-xs hover:bg-ayo hover:text-white'>Add to Cart</button>
        </Link>
        ))}
    </div>
  )
}

export default ProductList
