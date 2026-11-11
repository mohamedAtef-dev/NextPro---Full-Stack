"use client";

import { useEffect, useState } from "react";

interface IOrderItem {
    product: string;
    quantity: number;
    _id?: string;
}

interface IOrder {
    _id: string;
    status: string;
    totalPrice: number;
    items: IOrderItem[];
    createdAt: string;
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
        async function fetchOrders() {
            try {
                const res = await fetch("/api/orders/my");
                const data = await res.json();
                setOrders(Array.isArray(data) ? data : data.orders || []);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);


    if (loading) {
        return (
            <div className="p-6 max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">My Orders</h1>
                <p className="text-gray-500">Loading your orders...</p>
            </div>
        );
    }

    return(
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl mb-6">
                My Orders
            </h1>

            {orders.map((o) => (
                <div key={o._id} className="border p-4 mb-4 rounded">
                    <p>Status: {o.status}</p>
                    <p>Total Price: {o.totalPrice}</p>
                </div>
            ))}
        </div>
    );
}