'use client';

import useWishlist from '@/app/hooks/useWishlist';
import Button from '../Button'
import useCart from '@/app/hooks/useCart';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface ButtonSideProps {
    productId: string;
    cartIds: string[];
}

const ButtonsSide: React.FC<ButtonSideProps> = ({ productId, cartIds }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const action = "add";
    const { ispresentInCart, addToCart } = useCart({ productId, cartIds, action });

    const handleAddToCart = () => {
        setLoading(true)
        console.log(productId)
        if (!productId) {
            toast.error("Product is not found")
            setLoading(false)
            return;
        }
        if (ispresentInCart) {
            toast('Product already in cart')
            setLoading(false)
            return;
        }
        try {
            const headers = {
                'Content-type': 'Application/json'
            };
            axios.post('/api/addToCart', { productId }, { headers })
                .then(function (response) {
                    console.log("Response:", response);
                    router.refresh();
                    toast.success(response.data.message);
                })
                .catch(function (error) {
                    toast.error('Something went wrong')
                })
                .finally(() =>
                    setLoading(false)
                )
        } catch (error) {
            toast.error('Not found 404')
            setLoading(false)
        }
    }


    return (
        <>
            <div className="flex gap-4 my-2 mt-4 ">
                <Button label="Add To Cart" onClick={handleAddToCart} disabled={loading} />
            </div>
        </>
    )
}

export default ButtonsSide