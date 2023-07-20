import { UserCart } from "@/config/inventory";
import { groq } from "next-sanity";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { sanityClientUser } from "@/sanity/lib/client";

export async function POST(req: any) {
  const { userId } = auth();
  console.log(userId)
  if (!userId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const data = await req.json();
  const productId = data.productId;

  if (!productId) {
    return new NextResponse(JSON.stringify({ error: "ProductId is required" }), { status: 400 });
  }

  console.log(userId, productId);

  try {
    // Retrieve the user cart based on the user ID
    const userCartQuery = groq`*[_type == 'userCart' && userId == $userId]`;
    const userCartResult = await sanityClientUser.fetch<UserCart[]>(userCartQuery, { userId });

    let userCart: UserCart;

    if (userCartResult.length === 0) {
      // If the user cart doesn't exist, create a new one
      const cartId = uuidv4();
      userCart = await sanityClientUser.create<UserCart>({
        _id: cartId,
        _type: 'userCart',
        userId,
        productIds: [productId],
      });

      if (!userCart) {
        return new NextResponse(JSON.stringify({ error: "Failed to create the user cart" }), { status: 500 });
      }
    } else {
      userCart = userCartResult[0];
      userCart.productIds.push(productId);
      userCart = await sanityClientUser
        .patch(userCart._id)
        .set({ productIds: userCart.productIds })
        .commit();

      if (!userCart) {
        return new NextResponse(JSON.stringify({ error: "Failed to update the user cart" }), { status: 500 });
      }
    }

    return new NextResponse(
      JSON.stringify({ message: "Product added to cart successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to save user cart:', error);
    return new NextResponse(JSON.stringify({ error: "Failed to save user cart" }), { status: 500 });
  }
}
