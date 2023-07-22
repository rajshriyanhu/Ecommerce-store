'use client'

import { SanityProduct } from '@/config/inventory'
import Button from '../Button'
import { cartState, getTotalPrice, subscribeToCartChanges } from '@/store'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Loader from '../Loader'

interface CartSummaryProps {
  products: SanityProduct[]
}

const CartSummary: React.FC<CartSummaryProps> = ({ products }) => {
  const router = useRouter()
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false)
  const searchparams = useSearchParams();

  const removeAll = () => {
    axios.get('/api/removeAllFromCart')
      .then(function (response) {
        console.log(response)
      })
  }

  useEffect(() => {
    if (searchparams.get("success")) {
      toast.success("Payment completed.");
      router.push('/success')
    }

    if (searchparams.get("cancelled")) {
      toast.error("Something went wrong.")
      router.push('/cancel')
    }
  }, [searchparams, removeAll])

  const handleCheckout = async () => {
    setLoading(true)
    const response = await axios.get('/api/checkout')
    console.log(response)
    setLoading(false)
    window.location = response.data.url;
  }

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

  if (loading) {
    return <>
      <Loader />
      <div className='h-[235px] w-[90%] border flex flex-col shadow-lg rounded-xl'>
        <div className='text-xl font-bold mx-auto my-2'>Cart Summary</div>
        <hr className='my-2' />
        <div className=' ml-3 text-lg font-semibold my-2'>Grand Total</div>
        <div className='ml-3 text-xl font-semibold text-lime-500 '>₹ {totalPrice}</div>
        <p className='ml-3 text-slate-400 text-sm my-2'>Have a coupon code? <span className='text-lime-500 cursor-pointer'>Apply</span></p>
        <div className='mx-2'><Button label="Place Order" onClick={handleCheckout} disabled={loading} /></div>
      </div></>
  }

  return (
    <div className='h-[235px] w-[90%] border flex flex-col shadow-lg rounded-xl'>
      <div className='text-xl font-bold mx-auto my-2'>Cart Summary</div>
      <hr className='my-2' />
      <div className=' ml-3 text-lg font-semibold my-2'>Grand Total</div>
      <div className='ml-3 text-xl font-semibold text-lime-500 '>₹ {totalPrice}</div>
      <p className='ml-3 text-slate-400 text-sm my-2'>Have a coupon code? <span className='text-lime-500 cursor-pointer'>Apply</span></p>
      <div className='mx-2'><Button label="Place Order" onClick={handleCheckout} disabled={loading} /></div>
    </div>
  )
}

export default CartSummary