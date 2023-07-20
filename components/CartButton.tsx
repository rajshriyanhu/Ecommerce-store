'use client'

import useCart from '@/app/hooks/useCart';
import { GiShoppingCart } from 'react-icons/gi';
import {BsFillCartCheckFill} from 'react-icons/bs';
interface CartButtonProps {
    productId: string;
    cartIds: string[];
}

const CartButton: React.FC<CartButtonProps> = ({ productId , cartIds }) => {
    const action = "add";
    const { ispresentInCart, addToCart } = useCart({ productId, cartIds, action });

    return (
        <div
            onClick={addToCart}
            className={"relative hover:opacity-80 transition cursor-pointer"}>
            {ispresentInCart ? <BsFillCartCheckFill size={24} /> : <GiShoppingCart size={24} />}
        </div>
    )
}

export default CartButton