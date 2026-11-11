// import jwt from 'jsonwebtoken';
import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from 'jose';


export default async function middleware(request: NextRequest) {

        const secret = new TextEncoder().encode(
        process.env.JWT_SECRET
    )

    const token = request.cookies.get("token")?.value;// ? => undefined القيمة هتكون Error مش موجودة، بدل ما يحصل  Cookie لو ال 

    if (!token) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }
    

    try {
        const {payload} = await jwtVerify(token, secret) // JWT Token. => She needs to verify the accuracy of the

        const role = payload.role;
        
        const path = request.nextUrl.pathname;

        if (path.startsWith("/dashboard/admin")) {
            if(role !== "admin") {
                return NextResponse.redirect(
                    new URL("/dashboard/user?error=notadmin", request.url)
                );
            }
        }


        if (path.startsWith("/dashboard/user")) {
            if(role !== "user") {
                return NextResponse.redirect(
                    new URL("/dashboard/admin?error=notuser", request.url)
                );
            }
        }

        return  NextResponse.next(); // معناها إننا بنسمح للطلب يكمل طريقه للصفحة المطلوبة.

    } catch {
        return NextResponse.redirect(
            new URL('/login?error=jwt', request.url)
        )
    }
}

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*", "/products/:path*"],
};