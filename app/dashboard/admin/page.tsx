"use client";

import { useEffect, useState } from "react";
import AdminChart from "@/components/AdminChart";

interface UserDayStat {
    _id: string;
    count: number;
}
interface AdminStats {
    users: number;
    products: number;
    orders: number;
    visits: number;
    usersPerDay: UserDayStat[];
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<AdminStats | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchStats = async() => {
            const res = await fetch("/api/admin/stats");
            const data = await res.json();
            if(isMounted) {
                setStats(data);
            }
        };
        fetchStats();
        return () => {
            isMounted = false;
        };
    }, []);

    if (!stats) {
        return (
            <div className="p-6">
                جاري التحميل...
            </div>
        );
    }
    return (
        <div className="max-w-6xl p-6 mx-auto">
            <h1 className="text-2xl font-bold mb-6">
                لوحة تحكم الادمن
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <Card title="المستخدمون" value={stats.users} />
                <Card title="المنتجات" value={stats.products} />
                <Card title="الطلبات" value={stats.orders} />
                <Card title="الزيارات" value={stats.visits} />
            </div>
            <div className="mt-8">
                <AdminChart data={stats.usersPerDay}/>
            </div>
        </div>
    )
}

interface CardProps {
    title: string;
    value: string | number;
}

function Card({title, value}: CardProps) {
    return(
        <div className="bg-white rounded-lg shadow p-5">
        <p className="text-gray-500 text-sm">{title}</p>

        <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
    )
}