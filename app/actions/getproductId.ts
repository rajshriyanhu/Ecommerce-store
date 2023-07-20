import { sanityClient } from "@/sanity/lib/client";
import { auth } from "@clerk/nextjs";
import { groq } from "next-sanity";

export default async function getproductId(){
    const {userId} = auth()
    const query = groq`*[_type == 'userWishlist' && userId == $userId][0].productIds`;
    const productIds = await sanityClient.fetch<string[]>(query, { userId });
    return productIds;
}