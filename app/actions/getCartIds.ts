import { sanityClient } from "@/sanity/lib/client";
import { auth } from "@clerk/nextjs";
import { groq } from "next-sanity";

export default async function getCartIds(){
    const {userId} = auth()
    const query = groq`*[_type == 'userCart' && userId == $userId][0].productIds`;
    const cartIds = await sanityClient.fetch<string[]>(query, { userId });
    return cartIds;
}