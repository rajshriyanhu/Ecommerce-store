import { auth } from "@clerk/nextjs";
import getproductId from "./getproductId";
import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/lib/client";
import { SanityProduct } from "@/config/inventory";

export default async function getUserWishlist(){
    const {userId} = auth();
    if(!userId){
        console.log('Login first')
        return [];
    }
    const productIds = await getproductId()
    const query2 = groq`*[_type == 'product' && _id in $productIds]{
      _id,
      name,
      images,
      currency,
      price,
      "slug":slug.current,
    }`;
    const wishlistItems = await sanityClient.fetch<SanityProduct[]>(query2, { productIds });
    return wishlistItems;
}