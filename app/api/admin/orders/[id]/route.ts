import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import Notification from "@/models/Notification";

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET
);

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
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

        const {status} = await req.json();

        const { id } = await params;
        await connectDB();

        const order = await Order.findByIdAndUpdate( // findByIdAndUpdate => A function from Mongoose that searches for a request by ID
            id,
            {status},
            {new: true}
        );

        await Notification.create({
            user: order.user,
            message: `تم تحديث حالة طلبك إلي : ${status}`,
        });

        return NextResponse.json(order);

    } catch (err) {
        console.log(err);

        return NextResponse.json(
            {message: "Server Error"},
            {status: 500}
        );
    }
}