import connectDB from "@/lib/db";
import Order from "@/models/Order";
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
            return NextResponse.json(
                {message: "Unauthorized"},
                {status: 401}
            );
        }

        const {payload} = await jwtVerify(
            token,
            secret
        );

        await connectDB();

        const orders = await Order.find({
            user: payload.id,
        })
        .populate("items.product")
        .sort({createdAt: -1});

        return NextResponse.json(orders);
    } catch (err) {
        console.error("ORDERS ERROR:", err);

        return NextResponse.json(
            {message: "Server Error"},
            {status: 500}
        );
    }
}