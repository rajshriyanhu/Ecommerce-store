import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

interface cartParams {
    productId: string;
    cartIds: string[];
    action: string;
}

const useCart = ({ productId, cartIds, action }: cartParams) => {
    const { userId } = useAuth();
    const router = useRouter();
    let ispresentInCart:boolean;
    if(userId)ispresentInCart = cartIds.includes(productId);
    else ispresentInCart = false;

    const addToCart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        try {
            const headers = {
                'Content-type': 'Application/json'
            };
            axios.post('/api/addToCart', { productId }, { headers })
                .then(function (response) {
                    // console.log("Response:", response);
                    router.refresh();
                    toast.success(response.data.message);
                })
                .catch(function (error) {
                    toast.error('Something went wrong')
                });
        } catch (error) {
            toast.error('Something went wrong')
        }
    }, [router, productId, ispresentInCart]);

    const removeFromCart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        try {
            const headers = {
                'Content-type': 'Application/json'
            };
            axios.post('/api/removeFromCart', { productId }, { headers })
                .then(function (response) {
                    // console.log("Response:", response);
                    router.refresh();
                    toast.success(response.data.message);
                })
                .catch(function (error) {
                    console.log(`Error: ${error}`);
                    toast.error(error);
                });
        } catch (error) {

        }
    }, [router, productId, ispresentInCart]);

    if (!userId || cartIds === undefined) {
        return {
            ispresentInCart: false,
            addToCart,
            removeFromCart
        };
    } else {
        if (action === 'add') {
            if (ispresentInCart) {
                // toast("Item already in cart")
                return {
                    ispresentInCart,
                    addToCart,
                    removeFromCart
                };
            } else {
                return {
                    ispresentInCart,
                    addToCart,
                    removeFromCart
                };
            }
        } else {
            // remove from cart or wishlist
            return {
                ispresentInCart,
                addToCart,
                removeFromCart
            };
        }
    }
};

export default useCart;
