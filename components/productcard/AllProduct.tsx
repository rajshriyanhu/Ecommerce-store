import ProductCard from './ProductCard'
import { urlForImage } from '@/sanity/lib/image'
import getproductId from '@/app/actions/getproductId';
import getAllProducts from '@/app/actions/getAllProducts';
import getCartIds from '@/app/actions/getCartIds';

const AllProduct = async () => {
  const products = await getAllProducts();
  const wishlistIds = await getproductId();
  const cartIds = await getCartIds()

  return (
    <div className="w-[95%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xlgrid-cols-5 gap-4 mx-auto">
      {products.map((item) => {
        return (
          <ProductCard key={item._id} name={item.name} src={urlForImage(item.images[0]).url()} slug={item.slug} price={item.price} currency={item.currency} productId={item._id} wishlistIds={wishlistIds} cartIds={cartIds} />
        )
      })}
    </div>
  )
}

export default AllProduct