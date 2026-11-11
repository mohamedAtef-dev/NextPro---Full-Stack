import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET!
)

export async function GET() {
    try {
        const cookiesStore = await cookies();

        const token = cookiesStore.get("token")?.value;

        if(!token) {
            return NextResponse.json({user: null});
        }

        const {payload} = await jwtVerify(token, secret);

        await connectDB();

        const user = await User.findById(payload.id)
        .select("-password");

        if (!user) {
            return NextResponse.json({user});
        }

        return NextResponse.json({user});

    } catch(err) {
        console.log('AUTH ME ERROR:', err);

        return NextResponse.json({user: null});

    }
}