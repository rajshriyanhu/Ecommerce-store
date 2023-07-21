import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: ['https://ecommerce-store-three-henna.vercel.app/',/\/products\/[a-zA-Z0-9-]+/,/\/category\/[a-zA-Z0-9-]+/],
  ignoredRoutes: ["/studio/desk/product"]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
