'use client'

import EmptyState from '@/components/EmptyState'
import { useRouter } from 'next/navigation'
import React from 'react'

const SuccessPage = () => {
  const router = useRouter()
  return (
      <>
      <EmptyState title="Woohoo! Order Placed" subtitle="Your order will reach you soon!" />
      <div onClick={() => router.push('/')} className='w-full flex justify-center text-slate-500 cursor-pointer'>Continue Shopping</div></>
  )
}

export default SuccessPage