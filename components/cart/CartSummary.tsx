'use client'

import { SanityProduct } from '@/config/inventory'
import Button from '../Button'
import { cartState, getTotalPrice, subscribeToCartChanges } from '@/store'
import { useEffect, useState } from 'react'

interface CartSummaryProps {
  products: SanityProduct[]
}

const CartSummary:React.FC<CartSummaryProps> = ({products}) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Update the total price whenever the cartState changes
  useEffect(() => {
    setTotalPrice(getTotalPrice(products));
  }, []);

  // Subscribe to cartState changes to keep the total price up to date
  useEffect(() => {
    const unsubscribe = subscribeToCartChanges(() => {
      setTotalPrice(getTotalPrice(products));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className='h-[235px] w-[90%] border flex flex-col shadow-lg rounded-xl'>
        <div className='text-xl font-bold mx-auto my-2'>Cart Summary</div>
        <hr className='my-2' />
        <div className=' ml-3 text-lg font-semibold my-2'>Grand Total</div>
        <div className='ml-3 text-xl font-semibold text-lime-500 '>₹ {totalPrice}</div>
        <p className='ml-3 text-slate-400 text-sm my-2'>Have a coupon code? <span className='text-lime-500 cursor-pointer'>Apply</span></p>
        <div className='mx-2'><Button label="Place Order" onClick={() => {}} /></div>
    </div>
  )
}

export default CartSummary