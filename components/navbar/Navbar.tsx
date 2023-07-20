'use client'

import { UserButton } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs';
import { BiUserCircle } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai';
import { GiShoppingCart } from 'react-icons/gi'
import { usePathname, useRouter } from 'next/navigation';
import Logo from './Logo';

const Navbar = () => {
    const router = useRouter()
    const { userId } = useAuth();
    const path = usePathname();
    if(path.startsWith('/studio')){
        return null;
    }
    var isUserLoggedIn = false;
    if (userId) isUserLoggedIn = true;
    
    const handleWishlist = () => {
        if(userId)router.push('/wishlist')
        else router.push('/signin')
    }
    const handleCart = () => {
        if(userId)router.push('/cart')
        else router.push('/signin')
    }

    return (
        <div className='flex px-2 w-full items-center justify-between border shadow-lg bg-slate-200'>
            <Logo />
            <div className='flex gap-2'>
                <div onClick={handleWishlist} className='mx-2 flex items-center cursor-pointer'><AiOutlineHeart size={32} className='hover:text-zinc-600 cursor-pointer' /><span className='hidden md:block lg:block xl:block'>Wishlist</span></div>
                <div onClick={handleCart} className='mx-2 flex items-center cursor-pointer'><GiShoppingCart size={32} className='hover:text-zinc-800 cursor-pointer' /><span className='hidden md:block lg:block xl:block'>Cart</span></div>
                <div className='mx-2 flex items-center'>
                    {isUserLoggedIn ? <UserButton afterSignOutUrl="/" /> : <div onClick={() => router.push('/signup')} className='cursor-pointer hover:shadow-lg'><BiUserCircle size={32} /></div>}
                </div>
            </div>
        </div>
    )
}

export default Navbar