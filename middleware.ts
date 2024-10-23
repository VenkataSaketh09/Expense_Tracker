import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define public routes, including the home page, sign-in, and sign-up
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/'])

export default clerkMiddleware((auth, request) => {
  console.log("Request URL: ", request.url); // Debugging request URLs

  // Allow public routes to bypass authentication
  if (isPublicRoute(request)) {
    return; // Don't call auth().protect() for public routes
  }

  // Protect other routes, redirect to sign-in if not authenticated
  auth().protect();
})

export const config = {
  matcher: [
    // Match routes while skipping Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Apply to API routes as well
    '/(api|trpc)(.*)',
  ],
};
