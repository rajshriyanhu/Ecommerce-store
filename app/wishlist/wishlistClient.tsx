import Heading from '@/components/Heading'
import ProductCard from '@/components/productcard/ProductCard'
import { SanityProduct } from '@/config/inventory'
import { urlForImage } from '@/sanity/lib/image'

interface wishlistClientprops {
    items: SanityProduct[];
    wishlistIds: string[];
    cartIds: string[];
}

const wishlistClient: React.FC<wishlistClientprops> = ({ items, wishlistIds, cartIds }) => {
    return (
        <>
            <Heading
                title="Wishlist Items"
                subtitle="List of products you favorited!"
                center
            />
            <div className="w-[95%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto">
                {items.map((item) => {
                    const isWishListed = wishlistIds.includes(item._id)
                    return (
                        <ProductCard key={item._id} name={item.name} src={urlForImage(item.images[0]).url()} slug={item.slug} price={item.price} currency={item.currency} productId={item._id} wishlistIds={wishlistIds} cartIds={cartIds} />
                    )
                })}
            </div>
        </>
    )
}

export default wishlistClient