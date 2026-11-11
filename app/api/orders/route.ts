import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET
);

export async function POST(req: Request) {
    try {
        const cookiesStore = await cookies();
        const token = cookiesStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                {message: "Unauthorized"},
                {status: 401}
            );
        }

        const {payload} = await jwtVerify(token, secret);

        const body = await req.json();
        const {items, totalPrice} = body;

        if (!items || !Array.isArray(items) || items.length === 0 || totalPrice === undefined) {
            return NextResponse.json(
                {message: "Invalid data: items and totalPrice are required"},
                {status: 400}
            );
        }
        await connectDB();

        const order = await Order.create({
            user: payload.id,
            items,
            totalPrice,
            status: "pending",
        });
        return NextResponse.json(
            {message: "Order created successfully", order},
            {status: 201}
        );
    } catch (err) {
        console.log("ORDER ERROR" ,err);

        return NextResponse.json(
            {message: "Server error"},
            {status: 500}
        );
    }
}