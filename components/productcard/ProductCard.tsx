'use client'

import HeartButton from "../HeartButton";
import { useAuth } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import CartButton from "../CartButton";

interface ProductCardProps {
  name: string;
  src: string;
  currency: string;
  price: number;
  slug: string;
  productId: string;
  wishlistIds: string[];
  cartIds: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({ name, src, currency, price, slug, productId,wishlistIds, cartIds }) => {
  const router = useRouter()
  const {userId} = useAuth()

  const handleWishlist = () => {
    if(!userId)toast("You need to login first before creating your wishlist")
  }
  const handleCart = () => {
    if(!userId)toast("You need to login first before adding product to your cart")
  }

  return (
    <>
        <div className="bg-slate-100 w-[92%] h-[480px] border border-black shadow-xl hover:shadow-2xl my-4 mx-auto border border-white hover:scale-105 duration-500">
            <div onClick={() => router.push(`/products/${slug}`)} className="w-full h-[80%] cursor-pointer">
              <img src={src} alt={slug} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
            </div>
            <div onClick={() => router.push(`/products/${slug}`)} className="text-md my-1 mx-2">{name}</div>
          <div className="text-lg my-1 mx-2 font-semibold">{currency === 'INR' ? '₹ ' : '$'} {price}</div>
          <div className="flex gap-2 justify-between mb-2">
            <div className="text-slate-400 text-sm cursor-pointer ml-2">Get it by tomorrow</div>
            <div className="flex gap-4 mr-2">
              <div onClick={handleWishlist} className="cursor-pointer ">
              <HeartButton productId={productId} wishlistIds={wishlistIds} />
              </div>
              <div onClick={handleCart} className="cursor-pointer">
                <CartButton productId={productId} cartIds={cartIds} />
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default ProductCard