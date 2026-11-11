import { NextResponse, NextRequest } from "next/server";
import   connectDB  from "@/lib/db"; // دالة الاتصال بقاعدة البيانات لديك
import User from "@/models/User";
import { jwtVerify } from "jose";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();

        const token = request.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "(Unauthorized)" }, { status: 401 });
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        const currentAdmin = await User.findById(payload.id).select("role");

        if (!currentAdmin || currentAdmin.role !== "admin") {
            return NextResponse.json(
                { message: "ليس لديك صلاحيات الأدمن" },
                { status: 403 }
            );
        }

        // Read Data Request
        const { role } = await request.json(); 
        
        if (!["user", "admin"].includes(role)) { // فيها الصلاحيات المسموح بيها. Array  دي
            return NextResponse.json({ message: "صلاحية غير صالحة" }, { status: 400 });
        }

        // bring user the id 
        const { id: userId } = await params;

        // updata roule user in database
        const updatedUser = await User.findByIdAndUpdate(userId, { role }, 
            { new: true } // return updata data 
        ).select("-password"); // exclusion the password reutrn data

        if (!updatedUser) {
            return NextResponse.json({ message: "المستخدم غير موجود" }, { status: 404 });
        }

        return NextResponse.json({ 
            message: "تم تحديث الصلاحية بنجاح", 
            user: updatedUser 
        }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "حدث خطأ في السيرفر" }, { status: 500 });
    }
}