"use client";

import { useEffect, useState } from "react";

interface IOrder {
    _id: string;
    user?: {
        name?: string;
        email?: string;
    };
    totalPrice: number;
    status: string;
    createdAt?: string;
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const res = await fetch("/api/admin/orders");
                if (!res.ok) {
                    throw new Error("Failed to fetch orders");
                }
                const data = await res.json();
                setOrders(Array.isArray(data) ? data : data.orders || []);
            } catch (err) {
                console.error("Failed to fetch admin orders:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);

    async function changeStatus(id: string, status: string) {
        try {
            const res = await fetch(`/api/admin/orders/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json", // This means we are telling the API that the data we are sending is in JSON format.
                },
                body: JSON.stringify({ status }), // We convert the object into JSON so we can send it in the request.
            });

            if (res.ok) {
                setOrders((prev) =>
                    prev.map((order) =>
                    order._id === id ? { ...order, status } : order
                    )
                );
            } else {
                const data = await res.json();
                alert(data.message || "Failed to update status");
            }
        } catch (err) {
            console.error("Error updating order status:", err);
            alert("Something went wrong.");
        }
    }

    if (loading) {
        return (
            <div className="p-6 max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Orders Management</h2>
                <p className="text-gray-500">Loading orders...</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">

            <h2 className="text-2xl font-bold mb-6">
                Orders Management
            </h2>

            {orders.map((o) => (
                <div key={o._id} className="border rounded p-4 space-y-2 mb-3">
                    <p>User: {o.user?.name || "Unknow"}</p>
                    <p>Total: ${o.totalPrice}</p>
                    <p>Status: {o.status}</p>

                    {/* Actions */}
                    <div className="flex gap-2 mt-3">

                        <button onClick={() => changeStatus(o._id, "approved")} 
                            className="px-3 py-1 bg-green-600 text-white rounded">
                            Approved
                        </button>

                        <button onClick={() => changeStatus(o._id, "shipped")} 
                            className="px-3 py-1 bg-blue-600 text-white rounded">
                            Shipped
                        </button>

                        <button onClick={() => changeStatus(o._id, "rejected")} 
                            className="px-3 py-1 bg-red-600 text-white rounded">
                            Rejected
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}