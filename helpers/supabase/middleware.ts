import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const protectedRoutes = [
    "/dashboard",
    "/bookings",
    "/customers",
    "/settings",
    "/spaces",
    "/facilities",
  ];
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    currentPath.includes(route)
  );
  const subdomain = request.headers.get("host")?.split(".")[0] || "";

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && isProtectedRoute) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  } else if (user && !isProtectedRoute) {
    // user is logged in but trying to access a public route, redirect to dashboard
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (subdomain === "app") {
    setSubdomainHeader();
    return supabaseResponse;
  }

  const { data: validSubdomain } = await supabase
    .from("accounts")
    .select("subdomain")
    .eq("subdomain", subdomain)
    .single();

  if (!validSubdomain) {
    const url = new URL("https://kovaspace.com");
    return NextResponse.redirect(url);
  } else {
    const currentPath = request.nextUrl.pathname;

    setSubdomainHeader();

    if (currentPath === "/") {
      const url = new URL(`http://${subdomain}.localhost:3000/book`);
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  }

  // Clone the URL and add subdomain to request headers
  function setSubdomainHeader() {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-subdomain", subdomain);
    supabaseResponse.headers.set("x-subdomain", subdomain);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
