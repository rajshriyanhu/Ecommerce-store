'use client'

import { ImageType } from "@/config/inventory";
import { urlForImage } from "@/sanity/lib/image";
import { useState } from "react";

const ImageSide: React.FC<ImageType> = ({ images }) => {
    const image0 = urlForImage(images[0]).url();
    const [currImage, setCurrImage] = useState<string | undefined>(image0);


    const handleCurrentImage = (src: string) => {
        setCurrImage(src)
    }

    return (
        <>
            <div className="w-full h-[68vh]  rounded-xl overflow-hidden">
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