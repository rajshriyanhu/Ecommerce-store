'use client'

import { urlForImage } from "@/sanity/lib/image";
import { useState } from "react";
import HeartButton from "../HeartButton";
import { Image } from "sanity";
import { useAuth } from "@clerk/nextjs";
import { toast } from "react-hot-toast";

interface ImageSideProps{
    images: Image[]
    productId: string;
    wishlistIds: string[];
}

const ImageSide: React.FC<ImageSideProps> = ({ images, productId, wishlistIds }) => {
    const image0 = urlForImage(images[0]).url();
    const [currImage, setCurrImage] = useState<string | undefined>(image0);
    const {userId} = useAuth()

    const handleCurrentImage = (src: string) => {
        setCurrImage(src)
    }

    const handleWishlist = () => {
        if(!userId)toast("You need to login first before creating your wishlist")
      }


    return (
        <>
            <div className="w-full h-[68vh] rounded-xl overflow-hidden relative">
            <div onClick={handleWishlist} className="absolute top-2 right-2">
              <HeartButton productId={productId} wishlistIds={wishlistIds} />
              </div>
                <img src={currImage} alt="image" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
            </div>
            <div className="w-full mt-4 flex">{
                images.map((item, index) => (
                    <div key={index} onClick={() => handleCurrentImage(urlForImage(item).url())} className="h-[80px] w-[80px] cursor-pointer rounded-lg overflow-hidden border mr-3">
                        <img src={urlForImage(item).url()} alt="image" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                    </div>
                ))
            }</div>
        </>
    )
}

export default ImageSide
