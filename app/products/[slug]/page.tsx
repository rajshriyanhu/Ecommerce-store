import EmptyState from "@/components/EmptyState";
import ButtonsSide from "@/components/product/ButtonsSide";
import ImageSide from "@/components/product/ImageSide";
import { SanityProduct } from "@/config/inventory"
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

interface Props {
  params: {
    slug: string;
  }
}

const productDetailsPage = async ({ params }: Props) => {
  // console.log(params.slug)
  const product = await client.fetch<SanityProduct>(groq`*[_type == "product" && slug.current == "${params.slug}"][0]`)
  // console.log(product)
  if (!product) {
    return <div>
      <EmptyState title="Product not found" subtitle="Looks like the product you are finding is not available now" />
    </div>
  }

  return (
    <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row w-full">
      <div className="sm:w-full py-4 mx-2 md:w-1/2 lg:w-1/2 xl:w-1/2 md:py-4 md:mx-4 lg:py-8 lg:mx-8 xl:py-8 xl:mx-8">
        <ImageSide images={product?.images} />
      </div>

      <div className="sm:w-full py-4 mx-2 md:w-1/2 lg:w-1/2 xl:w-1/2 md:py-4 md:mx-4 lg:py-8 lg:mx-8 xl:py-8 xl:mx-8">
        <div className="text-black text-3xl font-semibold my-4">{product.name}</div>
        <div className="flex my-4">
          <div className="text-black text-5xl">{product.currency === 'INR' ? '₹' : '$'}</div>
          <div className="text-black text-5xl">{product.price}</div>
        </div>
        <div className="my-4">{product.description}</div>
        <div className="flex">
          <span className="mr-2">Colors available: </span>{
            product.colors[0] && product.colors.map((color) => (
              <div key={color} className="capitalize mr-2">
                {color}
              </div>
            ))
          }</div>
        <div className="flex"><span className="mr-2">Sizes available: </span>{product.sizes.map((item) => (
          <div key={item} className="capitalize mr-2">{item}</div>
        ))}</div>
        <div></div>
        <ButtonsSide />
      </div>
    </div>
  )
}

export default productDetailsPage