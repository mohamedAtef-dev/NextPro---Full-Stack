import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs"; // Hash	تشفير كلمة المرور باستخدام
import jwt from 'jsonwebtoken';
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const {email, password} = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                {message: "All fields required"},
                { status: 400}
            );
        }
        await connectDB();

        const user = await User.findOne({email})

// findOne => Its function is to search for the first user that matches the condition we have specified.
// The condition is => {email}

        if (!user) {
            return NextResponse.json(
                {message: "Invalid credentials"},
                { status: 401}
            );
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return NextResponse.json(
                {message: "Invalid credentials"},
                {status: 401}
            );
        }

        const token = jwt.sign(
            {id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET!,
            {expiresIn: "7d"}
        );

        const cookiesStore = await cookies();

        cookiesStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
        })

        return NextResponse.json({
            message: "Login success",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error){
        console.log("CRITICAL LOGIN ERROR:", error);
        return NextResponse.json(
            {message: "Server error"},
            {status: 500}
        );
    }
}