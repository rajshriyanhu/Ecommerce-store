import { proxy, subscribe } from 'valtio';

// Define the state object
export const cartState = proxy<{ [productId: string]: number }>({});

// Function to update the quantity of a product
export function updateQuantity(productId: string, quantity: number) {
  cartState[productId] = quantity;
}

// Function to get the total price
export function getTotalPrice(products: { _id: string; price: number }[]): number {
  let totalPrice = 0;
  for (const product of products) {
    const quantity = cartState[product._id] || 1;
    totalPrice += quantity * product.price;
  }
  return totalPrice;
}

// Subscribe to state changes
export function subscribeToCartChanges(callback: () => void) {
  const unsubscribe = subscribe(cartState, callback);
  return unsubscribe;
}
