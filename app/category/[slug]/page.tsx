import getCartIds from "@/app/actions/getCartIds";
import getCategoryProducts from "@/app/actions/getCategoryProducts";
import getproductId from "@/app/actions/getproductId";
import ProductCard from "@/components/productcard/ProductCard";
import { urlForImage } from "@/sanity/lib/image";

interface Props {
  params: {
    slug: string;
  };
}

const CategoryPage = async ({ params }: Props) => {
  const products = await getCategoryProducts(params.slug);
  const wishlistIds = await getproductId()
  const cartIds = await getCartIds()
  const category = params.slug.replace(/-/g, " ");

  // console.log(products)

  return (
    <>
    <div className="mx-4 text-2xl font-semibold my-2 capitalize">Buy Products from {category}</div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((item) => {
          return (
            <ProductCard key={item._id} name={item.name} src={urlForImage(item.images[0]).url()} slug={item.slug} price={item.price} currency={item.currency} productId={item._id} wishlistIds={wishlistIds} cartIds={cartIds} />
          )
        })}
      </div>
    </>
  );
};

export default CategoryPage;
