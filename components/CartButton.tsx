'use client'

import useCart from '@/app/hooks/useCart';
import { GiShoppingCart } from 'react-icons/gi';
import {BsFillCartCheckFill} from 'react-icons/bs';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'react-hot-toast';
interface CartButtonProps {
    productId: string;
    cartIds: string[];
}

const CartButton: React.FC<CartButtonProps> = ({ productId , cartIds }) => {
    const action = "add";
    const { ispresentInCart, addToCart } = useCart({ productId, cartIds, action });
    const {userId} = useAuth()
    if(!userId){
        return (
            <div
                className={"relative hover:opacity-80 transition cursor-pointer"}>
                <GiShoppingCart size={24} />
            </div>
        )
    }

    return (
        <div
            onClick={addToCart}
            className={"relative hover:opacity-80 transition cursor-pointer"}>
            {ispresentInCart ? <BsFillCartCheckFill size={24} /> : <GiShoppingCart size={24} />}
        </div>
    )
}

export default CartButton
