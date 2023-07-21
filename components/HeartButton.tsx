'use client'

import useWishlist from '@/app/hooks/useWishlist'
import { useAuth } from '@clerk/nextjs';
import { toast } from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface HeartButtonProps {
    productId: string;
    wishlistIds: string[];
}

const HeartButton: React.FC<HeartButtonProps> = ({ productId,wishlistIds }) => {
    const { isWishlisted, toggleFavorite } = useWishlist({ productId, wishlistIds });
    const {userId} = useAuth();
    if(!userId){
        return (
            <div
                className="relative hover:opacity-80 transition cursor-pointer">
                <AiOutlineHeart size={28} className=" fill-white absolute -top-[2px] -right-[2px]"/>
                <AiFillHeart size={24} className='fill-neutral-500/70'/>
            </div>
        )
    }

    return (
        <div
            onClick={toggleFavorite}
            className="relative hover:opacity-80 transition cursor-pointer">
            <AiOutlineHeart size={28} className=" fill-white absolute -top-[2px] -right-[2px]"/>
            <AiFillHeart size={24} className={isWishlisted ? 'fill-rose-500' : 'fill-neutral-500/70'}/>
        </div>
    )
}

export default HeartButton
