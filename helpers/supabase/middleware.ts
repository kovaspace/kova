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
    "/api",
  ];
  const stripeSignature = request.headers.get("stripe-signature");
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    currentPath.includes(route)
  );
  const subdomain = request.headers.get("host")?.split(".")[0] || "";
  const slug = request.nextUrl.pathname.split("/")[1];

  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
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

  if (stripeSignature && currentPath.includes("/api")) {
    const { data: userAccount } = await supabase
      .from("users")
      .select("id")
      .eq("id", user?.id)
      .single();

    setSubdomainHeader(userAccount?.id);

    return response;
  }

  if (!user && isProtectedRoute) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (user && !isProtectedRoute) {
    // user is logged in but trying to access a public route, redirect to dashboard
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (subdomain === "app") {
    const { data: userAccount } = await supabase
      .from("users")
      .select("id")
      .eq("id", user?.id)
      .single();

    setSubdomainHeader(userAccount?.id);

    return response;
  }

  if (subdomain === "book") {
    const { data: account } = await supabase
      .from("accounts")
      .select("id, slug")
      .eq("slug", slug)
      .single();

    if (!account) {
      return NextResponse.redirect("https://kovaspace.com");
    }

    setSubdomainHeader(account.id);

    return response;
  }

  // Clone the URL and add subdomain to request headers
  function setSubdomainHeader(accountId: string) {
    response.headers.set("x-account-id", accountId);
  }

  // IMPORTANT: You *must* return the response object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(response.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return response;
}
