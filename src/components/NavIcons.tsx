'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import CartModal from './CartModal';
import { useCart } from './CartProvider'

const NavIcons = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { itemCount } = useCart()

  const router = useRouter();

  const handleProfile = () => {
    router.push('/dashboard');
  };


  return (
    <div className=' flex items-center gap-4 xl:gap-6 relative'>
        <Image src="/profile.png" alt='profile logo'
        width={22}
        height={22} className='cursor-pointer '
        onClick={handleProfile}
        />
        <Image src="/notification.png" alt='notify logo'
        width={22} 
        height={22} className='cursor-pointer'/>

        <div className="relative">
        <button type="button" aria-label={`Open cart, ${itemCount} items`} aria-expanded={isCartOpen} onClick={() => setIsCartOpen((prev) => !prev)} className="flex h-10 w-10 items-center justify-center">
          <Image src="/cart.png" alt="" width={22} height={22} />
          {itemCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f35c7a] px-1 text-xs text-white">{itemCount}</span>}
        </button>
        </div>
        {isCartOpen && 
        <CartModal onClose={() => setIsCartOpen(false)} />

          }
    </div>
  )
}

export default NavIcons