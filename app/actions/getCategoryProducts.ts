import { SanityProduct } from "@/config/inventory";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export default async function getCategoryProducts(slug: string) {
  const products = await client.fetch<SanityProduct[]>(groq`*[_type == "product" && $slug in categories[]->slug.current]{
        _id,
        "slug":slug.current,
        price,
        name,
        images,
        currency,
      }`, { slug });
  return products
}