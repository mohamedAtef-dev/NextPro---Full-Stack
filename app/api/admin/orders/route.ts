import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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

        const {payload} = await jwtVerify(token, secret);

        if (payload.role !== 'admin') {
            return NextResponse.json(
                {message: "Forbidden"},
                {status: 403}
            );
        }

        await connectDB();

        const orders = await Order.find()
        .populate("user", "name email")
        .populate("items.product")
        .sort({createdAt: -1});

        return NextResponse.json(orders, { 
            status: 200, 
            headers: { 'Cache-Control': 'no-store' } 
        });

    } catch (err) {
        console.log(err);

        return NextResponse.json(
            {message: "Server Error"},
            {status: 500}
        );
    }
}