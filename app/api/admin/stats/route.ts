import connectDB from "@/lib/db";
import User from "@/models/User";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const users = await User.aggregate([
        {
            $match: {
                createdAt: {$gte: last30Days}
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d", // Converting a date to a string
                        date: "$createdAt"
                    }
                },
                count: {$sum: 1}
            }
        },
        {$sort: {_id: 1}}
    ]);

    const totalUsers = await User.countDocuments();// It calculates the total number of users in the database.
    const totalProducts = await Product.countDocuments(); // It calculates the total number of products.

    return NextResponse.json({
        usersPerDay: users,// Number of daily registered users over the last 30 days
        users: totalUsers,// Total users
        products: totalProducts,// Total products
        orders: 0,// Number of orders
        visits: 0, //Number of visits
    });
}

// countDocuments => Count the number of documents
// aggregate() => Data processing and aggregation
// $match => Data filtering
// $group => Data collection
// $sum => Calculating the sum of values
// $dateToString => Converting a date to text
// $sort => ترتيب البيانات