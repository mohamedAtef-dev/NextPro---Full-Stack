import connectDB from "@/lib/db";
import Notification from "@/models/Notification";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";


const secret = new TextEncoder().encode(
    process.env.JWT_SECRET
);

export async function GET() {
    try {
        const cookiesStore = await cookies();
        const token = cookiesStore.get("token")?.value;

        if(!token) {
            return NextResponse.json([], {status: 200});
        }

        const {payload} = await jwtVerify(token, secret);

        await connectDB();

        const notification = await Notification.find({
            user: payload.id,
        })
        .sort({createdAt: -1});

        return NextResponse.json(notification);
    } catch {
        return NextResponse.json([]);
    }
}