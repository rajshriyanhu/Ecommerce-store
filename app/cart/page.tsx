import CartCard from '@/components/cart/CartCard';
import CartSummary from '@/components/cart/CartSummary';
import { urlForImage } from '@/sanity/lib/image';
import React from 'react'
import getUserCart from '@/app/actions/getUserCart';
import getCartIds from '@/app/actions/getCartIds';
import EmptyState from '@/components/EmptyState';
import Heading from '@/components/Heading';


const CartPage = async() => {
    const cartItems =await getUserCart();
    const cartIds = await getCartIds();
    console.log(cartItems)

    if(cartItems.length===0){
      return <EmptyState title="Your cart is empty" subtitle="Looks like you have not added any items in your cart!" />
    }

  return (
    <div className='flex flex-col'>
      <Heading title="Your cart items" subtitle="Buy them before they go out of stock!" center />
      <div className='flex flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row'>
        <div className='sm:w-full md:w-full lg:w-2/3 xl:w-2/3 2xl:w-2/3 sm:p-2 md:p-4 lg:p-4 xl:p-8 2xl:p-8'>
          {cartItems.map((item) => {
            return (
              <CartCard key={item._id} id={item._id} name={item.name} currency={item.currency} price={item.price} slug={item.slug} src={urlForImage(item.images[0]).url()} cartIds={cartIds} />
            )
          })}
        </div>
        <div className="px-2 py-8 md:p-4 lg:p-4 xl:p-8 2xl:p-8 sm:w-full md:1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/3 flex md:justify-center justify-center ">
          <CartSummary products={cartItems} />
        </div>
      </div>
    </div>
  )
}

export default CartPage