import { SanityCategory } from "@/config/inventory"
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

export default async function getCategory(){
    const category = await client.fetch<SanityCategory[]>(groq`*[_type == "category"]{
        _id,
        _createdAt,
        name,
        "slug":slug.current,
        images,
        shortDescription,
      }`)
      return category
}