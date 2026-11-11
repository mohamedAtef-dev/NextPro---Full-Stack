"use client";

import { useEffect, useState } from "react";

interface INotification {
    _id: string;
    message: string;
    createdAt: string;
    read?: boolean;
}

export default function NotificationsPage() {
    const [list, setList] = useState<INotification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        async function fetchNotifications() {
            try {
                const res = await fetch("/api/notifications");
                const data = await res.json();

                setList(Array.isArray(data) ? data : data.notifications || []);
            } catch (err) {
                console.error("Failed to fetch notifications:", err);
            } finally {
                setLoading(false);
            }
    }
        fetchNotifications();
    }, []);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Notifications</h1>
                <p className="text-gray-500">جارِ تحميل الإشعارات...</p>
            </div>
        );
    }

    
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Notifications</h1>

            {list.length === 0 && (
                <p className="text-gray-500">
                    لايوجد إشعارات
                </p>
            )}

            <div className="spac-y-3">
                {list.map((n) => (
                    <div key={n._id} className="border mb-3 rounded p-4 bg-white shadow-sm">

                        <p>{n.message}</p>

                        <p className="text-xs text-gray-500 mt-1">
                            {new Date(n.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}