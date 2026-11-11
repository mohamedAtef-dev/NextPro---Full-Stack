import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const cookiesStore = await cookies();

        cookiesStore.set({
            name: "token",
            value: "",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 0, // It causes the cookie to expire immediately, and the browser deletes it.
        });

        return NextResponse.json(
            { message: "Logged out successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// It causes the cookie to expire immediately, and the browser deletes it.

// export async function POST() {
//     const cookiesStore = await cookies();
//     cookiesStore.delete("token")

//         return NextResponse.json({
//             message: "Logged Out",
//         });
// }