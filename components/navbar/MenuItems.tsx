'use client'

import { BiUserCircle } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai';
import { GiShoppingCart } from 'react-icons/gi'
import { useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

interface MenuItemsProps{
    isUserLoggedIn: boolean;
}

const MenuItems:React.FC<MenuItemsProps> = ({isUserLoggedIn}) => {
    const router = useRouter()
  return (
    <div className='flex gap-2'>
                <div onClick={() => router.push('wishlist')} className='mx-2 flex items-center cursor-pointer'><AiOutlineHeart size={32} className='hover:text-zinc-600 cursor-pointer' />Wishlist</div>
                <div onClick={() => router.push('cart')} className='mx-2 flex items-center cursor-pointer'><GiShoppingCart size={32} className='hover:text-zinc-800 cursor-pointer' />Cart</div>
                <div className='mx-2 flex items-center'>
                    {isUserLoggedIn ? <UserButton afterSignOutUrl="/" /> : <div onClick={() => router.push('/signup')} className='cursor-pointer hover:shadow-lg'><BiUserCircle size={32} /></div>}
                </div>
            </div>
  )
}

export default MenuItems