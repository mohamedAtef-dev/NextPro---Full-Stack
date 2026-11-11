import mongoose from "mongoose";

// تحديد شكل البيانات 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
}, {
    timestamps: true 
// updatedAt: "تاريخ آخر تعديل" , createdAt: "تاريخ إنشاء المستخدم" يضيف تاريخين بشكل تلقائي لكل مستخدم Mongoose دي خاصية بتخلي
});

export default mongoose.models.User || 
mongoose.model("User", userSchema);
//مسؤول عن تحديد شكل بيانات المستخدم في قاعدة البيانات.