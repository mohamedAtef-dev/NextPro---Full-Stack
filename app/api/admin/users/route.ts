import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { jwtVerify } from "jose";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        //Securing the API and verifying that it has admin privileges
        const token = request.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "غير مسجل دخول" }, { status: 401 });
        }
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        if (payload.role !== "admin") {
            return NextResponse.json({ message: "ممنوع الوصول" }, { status: 403 });
        }

        // Retrieve all users from the database, excluding the password.
        const users = await User.find({}).select("-password").sort({ createdAt: -1 });

        return NextResponse.json(users, { status: 200, headers: { 'Cache-Control': 'no-store' } });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "خطأ في السيرفر" }, { status: 500 });
    }
}