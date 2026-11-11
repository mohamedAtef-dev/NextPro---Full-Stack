"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";


interface IUser {
    name?: string;
    email?: string;
    role?: string;// admin || user
}
interface INotification {
    _id: string;
    message: string;
    read?: boolean;
    createdAt?: string;
}


export default function Header() {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

        const [notifications, setNotifications] = useState<INotification[]>([]);

useEffect(() => {
    async function fetchNotifications() {
        try {
            const res = await fetch("/api/notifications");

            if (!res.ok) {
                throw new Error("Failed to fetch notifications");
            }

            const data = await res.json();
            setNotifications(data);
        } catch (error) {
            console.error(error);
        }
    }

    fetchNotifications();
}, []);

    //Unread notification count
    const unread = notifications.filter(
        n => !n.read
    ). length;

    const {cart} = useCart();
    const count = cart.reduce(
        (sum, i) => sum + (i.quantity ?? 1),
        0
    );

    useEffect(() => {
        async function fetchUser() {
            try{
                const res = await fetch("/api/auth/me", {
                    credentials: "include"
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                }
            } catch (error) {
                console.log(error);
            }

            setLoading(false);
        }
        fetchUser();

    }, []);

    const handleLogout = async () => {
            try {
                const res = await fetch("/api/logout", {
                method: "POST",
            });

            if (res.ok) {
                setUser(null);
                router.push("/login");
                router.refresh(); // لتفريغ الـ Cache وتحديث حالة الصفحة
            }
        } catch (error) {
            console.log("Logout failed", error);
        }
    };
    if (loading) return null;

    return(
        <header className="border-b bg-white">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center flex-col md:flex-row">

                <Link href='/' className="text-xl font-bold">
                    NextPro
                </Link>

                <nav className="text-sm flex gap-6 items-center flex-col md:flex-row">

                    <Link href='/products' className="hover:text-blue-600">
                        Products
                    </Link>

                    {user && (
                        <>
                            <Link href='/dashboard' className="hover:text-blue-600">
                            Dashboard
                        </Link>

                            <Link href='/profile' className="hover:text-blue-600">
                            Profile
                        </Link>

                        <Link href='/cart' className="relative flex items-center gap-1 hover:text-indigo-600">
                        Cart

                        {count > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                {count}
                            </span>
                        )}
                        </Link>

                        <Link href='/notifications' className="relative">
                        🛒
                        {unread > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
                                {unread}
                            </span>
                        )}
                        </Link>
                        </>

                    )}

                    {user ? (
                        
                            <button onClick={handleLogout} className="ml-4 px-4 py-2 rounded-md bg-red-500 text-black text-sm hover:bg-red-600 transition">Logout</button>

                        ) : (
                            <Link href='/login'
                            className="ml-4 px-4 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-800 transition">Login</Link>
                        
                    )}

                </nav>
            </div>
        </header>
    );
}