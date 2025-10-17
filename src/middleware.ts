import { NextRequest, NextResponse } from "next/server";
import { getSession, isAuthorized } from "./utils/session";

const login_routes = [
    "/auth/student"
]

export async function middleware(request: NextRequest){

    const pathname = request.nextUrl.pathname.toLocaleLowerCase()
    const is_authorized = await isAuthorized();

    // TODO: login and redirect are currently only works for student routes

    // redirect authorized users away from login routes
    if(is_authorized && login_routes.includes(pathname)){
        return NextResponse.redirect(new URL("/student/dashboard", request.url))
    }

    // authorize all routes and redirect to login except to the login_routes
    if(!is_authorized && !login_routes.includes(pathname)){
        console.log(request.nextUrl.pathname)
        return NextResponse.redirect(new URL("/auth/student", request.url))
    }
}

export const config = {
    matcher: [
        /*
        * Match all request paths except for the ones starting with:
        * - api (API routes)
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico (favicon file)
        * - auth (login routes)
        * - / (root file)
        */
        '/((?!api|_next/static|_next/image|favicon.ico|$).*)',
    ],
}