import getUsercart from "@/app/actions/getUserCart"
import { stripe } from "@/libs/stripe"
import { auth, currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function GET(req: Request) {
    try {
        const { userId } = auth()
        const user = await currentUser()

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const cartProducts = await getUsercart()

        if(!cartProducts || cartProducts.length===0){
            return new NextResponse("ProductIds are required", {status : 400})
        }


        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

        cartProducts.forEach((product) => {
            line_items.push({
                quantity: 1,
                price_data: {
                    currency: product.currency,
                    product_data: {
                        name: product.name,
                    },
                    unit_amount: product.price*100
                }
            })
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            billing_address_collection: 'required',
            phone_number_collection: {
                enabled: true
            },
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
            metadata: {
                userId: userId
            }
        })

        return NextResponse.json({url: session.url})

    } catch (error) {
        console.log("[STRIPE_ERROR]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}