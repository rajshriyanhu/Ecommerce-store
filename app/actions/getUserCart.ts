import { SanityProduct } from "@/config/inventory";
import { sanityClient } from "@/sanity/lib/client";
import { auth } from "@clerk/nextjs";
import { groq } from "next-sanity";

export default async function getUsercart(){
    const {userId} = auth();
    if(!userId){
        console.log('Login first')
        return [];
    }
    const query = groq`*[_type == 'userCart' && userId == $userId][0].productIds`;
    const productIds = await sanityClient.fetch<string[]>(query, { userId });
    const query2 = groq`*[_type == 'product' && _id in $productIds]{
      _id,
      name,
      images,
      currency,
      price,
      "slug":slug.current,
    }`;
    const cartItmes = await sanityClient.fetch<SanityProduct[]>(query2, { productIds });
    return cartItmes
}