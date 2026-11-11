import connectDB from "@/lib/db";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET
);


interface RouteParams {
    params: {
        id: string;
    }
}
export async function PUT(req: NextRequest, {params}: RouteParams) {
    try {
        const cookiesStore = await cookies();
        const token = cookiesStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized - يجب تسجيل الدخول" },
                { status: 401 }
            );
        }

        const { payload } = await jwtVerify(token, secret);

        if (payload.role !== 'admin') {
            return NextResponse.json(
                { message: "Forbidden - غير مسموح لك بتنفيذ هذا الإجراء" },
                { status: 403 }
            );
        }
        await connectDB();
        const body = await req.json();
        const {id} = await params
        const product = await Product.findByIdAndUpdate(
        id,
        body,
        {new: true}
    );

    if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(product);
    } catch (err) {
        console.log("UPDATE PRODUCT ERROR:", err);
        return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, {params}: RouteParams) {
    try {
        const cookiesStore = await cookies();
        const token = cookiesStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized - يجب تسجيل الدخول" },
                { status: 401 }
            );
        }

        const { payload } = await jwtVerify(token, secret);

        if (payload.role !== 'admin') {
            return NextResponse.json(
                { message: "Forbidden - غير مسموح لك بتنفيذ هذا الإجراء" },
                { status: 403 }
            );
        }
        await connectDB();
        const { id } = await params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.log("DELETE PRODUCT ERROR:", err);
        return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
        );
    }
}