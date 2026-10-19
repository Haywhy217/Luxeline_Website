import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const slides =[
  {
    id: 1,
    title:"Summer Sale Collections",
    description:"Sales! up to 30 % off!",
    img:"/summer.jpg",
    url:"/",
    bg:"bg-gradient-to-r from-yellow-50 to-pink-50",
    
  },
  {
    id:2,
    title:"Winter Sale Collections",
    description: " Sales! up to 30 % off!",
   img:"/winter.jpg",
   url:"/",
   bg:"bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "Spring Sale Collections",
    description:" Sales! up to 30 % off!",
    img:"/spring.jpg",
    url:"/",
    bg:"bg-gradient-to-r from-blue-50 to-yellow-50"
  },
]
const Slider = () => {
  const[current, setCurrent ]= useState(0);

  useEffect(() => {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 3000);
      return () => clearInterval(interval);
    }, []);
  
  return (
    <div className="h-[calc(100svh-5rem)] min-h-[34rem] max-h-[56rem] overflow-hidden">
     <div className="flex h-full w-max transition-transform duration-1000 ease-out"
          style={{transform: `translateX(-${current * 100}vw)`}}

     >
      {
        slides.map(slide => (
          <div className={`${slide.bg} relative grid h-full w-screen grid-rows-[minmax(15rem,0.9fr)_minmax(14rem,1.1fr)] xl:grid-cols-2 xl:grid-rows-1`} key={slide.id}>
            {/* TEXT CONTAINER */}
            <div className="flex flex-col items-center justify-center gap-5 px-5 py-6 text-center sm:gap-7 xl:gap-10 xl:px-10">
              <h2 className="text-lg sm:text-xl lg:text-3xl 2xl:text-5xl">{slide.description}</h2>
              <h1 className="text-4xl font-semibold sm:text-5xl lg:text-6xl 2xl:text-8xl">{slide.title}</h1>
              <Link href={slide.url} className="bg-black px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-800 sm:text-base">SHOP NOW</Link>
            </div>
            {/* Image Container */}
            <div className="relative min-h-0 xl:min-h-full">
              <Image src={slide.img} alt="" fill sizes="(min-width: 1280px) 50vw, 100vw" className="object-cover object-center" priority={slide.id === 1} />
            </div>
            <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-4 xl:bottom-7">
              {
                slides.map((item, index) => (
                  <button
                    type="button"
                    aria-label={`Show ${item.title}`}
                    aria-current={current === index}
                    className={`flex h-7 w-7 items-center justify-center rounded-full ring-1 ring-gray-600 ${current === index ? "scale-110" : ""}`}
                    key={item.id}
                    onClick={() => setCurrent(index)}
                  >
                    <span className={`h-2 w-2 rounded-full ${current === index ? "bg-gray-700" : "bg-transparent"}`} />
                  </button>
                ))
              }
              </div>
          </div>
        ))
      }
        
      </div>
    </div>
  )}

export default Slider
