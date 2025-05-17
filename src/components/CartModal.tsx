
'use client'
import Image from "next/image"
const CartModal = () => {

  const cartItems = true;

  return (
    <div className=" w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20 ">
      {!cartItems ? (
      <div className=" ">Cart is Empty</div>
      ) :(
        <>
        <h2 className="text-xl">Shopping Cart</h2>
        <div className="flex flex-col gap-8">
          {/* ITEM */}
        <div className="flex gap-4">
          <Image src='' alt="" width={72} height={96} className="object-cover rounded-md"/>

        <div className=" flex flex-col justify-between w-full ">
          <div className="top">
            <div className="flex items-center justify-between gap-8">
              <h3 className="font-semibold">Product Name</h3>
              <div className="p-1 bg-gray rounded-sm">$55</div>
            </div>
            <div className=" text-sm text-gray-500"> Available</div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Qty.2</span>
            <span className="text-blue-500">Remove</span>
          </div>
         
        </div>
        </div>

         {/* ITEM */}
         <div className="flex gap-4">
          <Image src='' alt="" width={72} height={96} className="object-cover rounded-md"/>

        <div className=" flex flex-col justify-between w-full ">
          <div className="top">
            <div className="flex items-center justify-between gap-8">
              <h3 className="font-semibold">Product Name</h3>
              <div className="p-1 bg-gray rounded-sm">$55</div>
            </div>
            <div className=" text-sm text-gray-500"> Available</div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Qty.2</span>
            <span className="text-blue-500">Remove</span>
          </div>
         
        </div>
        </div>
        </div>
        <div>
          <div className="flex items-center justify-between font-semibold">
            <span> Subtotal</span>
            <span> Amount</span>
          </div>
          <p className="text-gray-500 text-sm mt-2 mb-4">Shipping and taxes calculated at checkout</p>
            <div className="flex justify-between text-sm">
              <button className="px-3 py-4 rounded-md ring-1 ring-gray-100">View Cart</button>
              <button className="px-3 py-4 rounded-md  bg-black text-white">Checkout</button>
            </div>
        
        </div>
        </>
      )}
    </div> 
  )
}

export default CartModal