import mongoose, { model, models } from "mongoose";

// تحديد شكل البيانات 
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // إزالة المسافات الزائدة من بداية ونهاية النص
    },
        price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "",
    },
}, {
    timestamps: true 
// updatedAt: "تاريخ آخر تعديل" , createdAt: "تاريخ إنشاء المستخدم" يضيف تاريخين بشكل تلقائي لكل مستخدم Mongoose دي خاصية بتخلي
});

const Product = models.Product || model("Product", ProductSchema);
export default Product;
//مسؤول عن تحديد شكل بيانات المستخدم في قاعدة البيانات.