import getUserWishlist from '../actions/getUserWishlist';
import getproductId from '../actions/getproductId';
import EmptyState from '@/components/EmptyState';
import WishlistClient from './wishlistClient';
import getCartIds from '../actions/getCartIds';

const WishlistPage = async() => {
  const wishlistIds = await getproductId()
  const wishlistItems =await getUserWishlist();
  const cartIds = await getCartIds()

  if(wishlistItems.length===0){
    return <EmptyState title="No favorites found" subtitle="Looks like you have no favorties products" />
  }
  
  return (
    <WishlistClient items={wishlistItems} wishlistIds={wishlistIds} cartIds={cartIds} />
    
  )
}

export default WishlistPage