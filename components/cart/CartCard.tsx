'use client';

import useCart from '@/app/hooks/useCart';
import { cartState, getTotalPrice, subscribeToCartChanges, updateQuantity } from '@/store';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiFillDelete } from 'react-icons/ai'

interface CartCardProps {
    name: string;
    src: string;
    id: string;
    price: number;
    currency: string;
    slug: string;
    cartIds: string[];
}

const CartCard: React.FC<CartCardProps> = ({ name, id, src, currency, price, slug, cartIds }) => {
    const action ="remove";
    const productId = id;
    const { ispresentInCart, removeFromCart } = useCart({ productId, cartIds, action });


    const [quantity, setQuantity] = useState<number>(cartState[id] || 0);

    useEffect(() => {
        const unsubscribe = subscribeToCartChanges(() => {
            setQuantity(cartState[id] || 1);
        });
        const products = [{ _id: id, price }];
        const updatedTotalPrice = getTotalPrice(products);
        console.log(updatedTotalPrice)
        return () => {
            unsubscribe();
        };
    }, [id]);

    const handleIncreaseQuantity = (_id: string) => {
        updateQuantity(_id, cartState[_id] + 1);
    }
    const handleDecreaseQuantity = (_id: string) => {
        if (cartState[_id] == 1) {
            updateQuantity(_id, cartState[_id]);
        }
        else updateQuantity(_id, cartState[_id] - 1);
    }

    
    return (
        <div className='w-[94%] md:w-[90%] lg:w-[90%] xl:w-[90%] 2xl:w-[90%] mx-auto my-2 md:mx-8 md:my-8 lg:mx-8 lg:my-8 xl:mx-8 xl:my-8 2xl:mx-8 2xl:my-8 h-[180px] flex gap-3 items-center shadow-xl rounded-md relative border'>
            <div className='w-[150px] h-[150px] m-2'>
                <img src={src} alt={slug} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
            </div>
            <div className='flex flex-col h-full justify-evenly'>
                <div className='text-md  md:text-xl lg:text-xl xl:text-xl 2xl:text-xl capitalize elipsis'>{name}</div>
                <div className="text-xl my-1 mx-1 font-semibold">{currency === 'INR' ? '₹ ' : '$'} {price}</div>
                <div className='w-[81px] h-[30px] flex border rounded-sm items-center justify-center'>
                    <div onClick={() => handleDecreaseQuantity(id)} className='h-[30px] w-[27px] text-xl flex items-center justify-center cursor-pointer'>-</div>
                    <div className='h-[30px] w-[27px] text-xl flex items-center justify-center'>{quantity}</div>
                    <div onClick={() => handleIncreaseQuantity(id)} className='h-[30px] w-[27px] text-xl flex items-center justify-center cursor-pointer'>+</div>
                </div>
            </div>
            <div onClick={removeFromCart} className='absolute top-0 right-0 mt-2 mr-2 cursor-pointer hover:text-rose-500'>
                <AiFillDelete size={28} className='' />
            </div>
        </div>
    )
}

export default CartCard