import connectDB from "@/lib/db";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET
);

export async function GET() {
try {
        await connectDB();
        const products = await Product.find();
        return NextResponse.json(products);
    } catch (err) {
        console.log("GET PRODUCTS ERROR:", err);
        return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
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
                { message: "Forbidden - غير مسموح لك بإضافة منتجات" },
                { status: 403 }
            );
        }

        await connectDB();
        const body = await req.json();

        if (!body.title || !body.price) {
            return NextResponse.json(
                { message: "اسم المنتج والسعر مطلوبة" },
                { status: 400 }
            );
        }

        const product = await Product.create(body);

        return NextResponse.json(product, { status: 201 });
    } catch (err) {
        console.log("CREATE PRODUCT ERROR:", err);
        return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
        );
    }
}