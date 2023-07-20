import { UserCart } from "@/config/inventory";
import { groq } from "next-sanity";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { sanityClientUser } from "@/sanity/lib/client";

export async function POST(req: any) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const data = await req.json();
  const productId = data.productId;
  console.log("remove",userId, productId);

  if (!productId) {
    return new NextResponse(JSON.stringify({ error: "ProductId is required" }), { status: 400 });
  }

  console.log("remove",userId, productId);

  try {
    // Retrieve the user cart based on the user ID
    const userCartQuery = groq`*[_type == 'userCart' && userId == $userId]`;
    const userCartResult = await sanityClientUser.fetch<UserCart[]>(userCartQuery, { userId });

    if (userCartResult.length === 0) {
      return new NextResponse(JSON.stringify({ error: "User cart not found" }), { status: 404 });
    }

    const userCart = userCartResult[0];
    const productIndex = userCart.productIds.indexOf(productId);

    if (productIndex === -1) {
      return new NextResponse(JSON.stringify({ error: "Product not found in the user cart" }), { status: 404 });
    }

    userCart.productIds.splice(productIndex, 1);

    const updatedUserCart = await sanityClientUser
      .patch(userCart._id)
      .set({ productIds: userCart.productIds })
      .commit();

    if (!updatedUserCart) {
      return new NextResponse(JSON.stringify({ error: "Failed to update the user cart" }), { status: 500 });
    }

    return new NextResponse(
      JSON.stringify({ message: "Product removed from cart successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to update user cart:', error);
    return new NextResponse(JSON.stringify({ error: "Failed to update user cart" }), { status: 500 });
  }
}
