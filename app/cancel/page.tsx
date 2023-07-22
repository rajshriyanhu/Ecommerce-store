'use client'

import EmptyState from '@/components/EmptyState'
import { useRouter } from 'next/navigation'
import React from 'react'

const CancelPage = () => {
  const router = useRouter()
  return (
    <>
      <EmptyState title="Your payment was cancelled" subtitle="Looks like something went wrong. You can try again later." />
      <div onClick={() => router.push('/')} className='w-full flex justify-center text-slate-500 cursor-pointer'>Continue Shopping</div>
    </>
  )
}

export default CancelPage