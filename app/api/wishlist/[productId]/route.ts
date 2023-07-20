import { createClient, groq } from "next-sanity";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { sanityClientUser } from "@/sanity/lib/client";

interface IParams {
    productId?: string;
  }

export async function POST(req: Request, { params }: { params: IParams }) {
  const { userId } = auth();
  // console.log(userId)
  if (!userId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const {productId} = params;

  if (!productId) {
    return new NextResponse(JSON.stringify({ error: "ProductId is required" }), { status: 400 });
  }

  // console.log(userId, productId);

  try {
    // Check if the user exists in the database
    const userWishlistQuery = groq`*[_type == 'userWishlist' && userId == $userId]`;
    const userResult = await sanityClientUser.fetch(userWishlistQuery, { userId });

    // console.log('User result:', userResult);

    if (userResult.length === 0) {
      // User doesn't exist, add the user with the productId array
      // console.log('Adding new user...');
      const newUserWishlist = await sanityClientUser.create({
        _type: 'userWishlist',
        userId,
        productIds: [productId],
      });

      // console.log('New user:', newUserWishlist);

      if (!newUserWishlist) {
        return new NextResponse(JSON.stringify({ error: "Failed to add the user" }), { status: 500 });
      }
    } else {
      // User exists, search for the productId in the database
      const userWishlist = userResult[0];

      // console.log('Existing user:', userWishlist);

      const productIndex = userWishlist.productIds.indexOf(productId);

      if (productIndex === -1) {
        // Product not found in the user's productIds, add it
        userWishlist.productIds.push(productId);
      } 


      const updatedUserWishlist = await sanityClientUser
        .patch(userWishlist._id)
        .set({ productIds: userWishlist.productIds })
        .commit();

      // console.log('Updated user response:', updatedUserWishlist);

      if (!updatedUserWishlist) {
        return new NextResponse(JSON.stringify({ error: "Failed to update the user" }), { status: 500 });
      }
    }

    return new NextResponse(
      JSON.stringify({ message: "User wishlist updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    // console.error('Failed to update user wishlist:', error);
    return new NextResponse(JSON.stringify({ error: "Failed to update user wishlist" }), { status: 500 });
  }
}


export async function DELETE(req: Request, { params }: { params: IParams }){
  const { userId } = auth();
  // console.log(userId)
  if (!userId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const {productId} = params;

  if (!productId) {
    return new NextResponse(JSON.stringify({ error: "ProductId is required" }), { status: 400 });
  }

  // console.log(userId, productId);

  try {
    // Check if the user exists in the database
    const userWishlistQuery = groq`*[_type == 'userWishlist' && userId == $userId]`;
    const userResult = await sanityClientUser.fetch(userWishlistQuery, { userId });

      // User exists, search for the productId in the database
      const userWishlist = userResult[0];

      // console.log('Existing user:', userWishlist);

      const productIndex = userWishlist.productIds.indexOf(productId);

        userWishlist.productIds.splice(productIndex, 1);

      // console.log('Updated user:', userWishlist);

      const updatedUserWishlist = await sanityClientUser
        .patch(userWishlist._id)
        .set({ productIds: userWishlist.productIds })
        .commit();

      // console.log('Updated user response:', updatedUserWishlist);

      if (!updatedUserWishlist) {
        return new NextResponse(JSON.stringify({ error: "Failed to update the user" }), { status: 500 });
      }

    return new NextResponse(
      JSON.stringify({ message: "User wishlist updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    // console.error('Failed to update user wishlist:', error);
    return new NextResponse(JSON.stringify({ error: "Failed to update user wishlist" }), { status: 500 });
  }
}