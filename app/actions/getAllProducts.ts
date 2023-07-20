import { SanityProduct } from "@/config/inventory";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export default async function getAllProducts(){
    const products = await client.fetch<SanityProduct[]>(groq`*[_type == "product"]{
        _id,
        _createdAt,
        name,
        images,
        currency,
        price,
        description,
        "slug":slug.current,
      }`)
      return products;
}