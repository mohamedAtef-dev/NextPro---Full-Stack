import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    items: [
        {
            product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            require: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],

    totalPrice: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum: [
            "pending",
            "processing",
            "shipped",
            "delivered",
            "cancelled",
        ],
        default: "pending",
    },
}, {timestamps: true});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);