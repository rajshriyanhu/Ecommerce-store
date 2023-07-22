import { UserCart } from "@/config/inventory";
import { sanityClientUser } from "@/sanity/lib/client";
import { auth } from "@clerk/nextjs";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET() {
    const { userId } = auth();
    if (!userId) {
        return new NextResponse("User not found", { status: 401 })
    }
    const userCartQuery = groq`*[_type == 'userCart' && userId == $userId]`;
    const userCartResult = await sanityClientUser.fetch<UserCart[]>(userCartQuery, { userId });

    if (userCartResult.length === 0) {
        return new NextResponse(JSON.stringify({ error: "User cart not found" }), { status: 404 });
    }

    const userCart = userCartResult[0];

    const productIdsToRemove = userCart.productIds.map((product) => product);

    // Step 3: Update the user's cart to remove the products
    const updatedUserCart = {
        ...userCart,
        products: userCart.productIds.filter((product) => !productIdsToRemove.includes(product))
    };

    // Step 4: Save the updated user cart to Sanity
    await sanityClientUser.createOrReplace(updatedUserCart);

    // Step 5: Optionally, you can handle the response and return appropriate messages or statuses.
    return new NextResponse(`Successfully removed ${productIdsToRemove.length} products from the cart`, { status: 200 });

}