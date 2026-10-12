'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import CartModal from './CartModal';

const NavIcons = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)

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

        <div className='relative cursor-pointer'>
        <Image src="/cart.png" alt=' cart logo' 
        width={22}
        height={22}
        className='cursor-pointer'
        onClick={()=>setIsCartOpen((prev)=> !prev)}
        />
        <div className='absolute -top-4 -right-4 w-6 h-6 bg-[#f35c7a] rounded-full text-white text-sm flex items-center justify-center'>2</div>
        </div>
        {isCartOpen && 
        <CartModal/>

          }
    </div>
  )
}

export default NavIcons