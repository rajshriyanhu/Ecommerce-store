import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ['/',/\/products\/[a-zA-Z0-9-]+/,/\/category\/[a-zA-Z0-9-]+/],
  ignoredRoutes: ["/studio/desk/product"]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
