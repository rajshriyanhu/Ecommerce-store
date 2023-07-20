import { type SchemaTypeDefinition } from 'sanity'
import { product } from './schemas/product-schema'
import { category } from './schemas/category-schema'
import { userCart } from './schemas/cart-schema'
import { userWishlist } from './schemas/wishlist-schema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,category,userCart,userWishlist],
}
