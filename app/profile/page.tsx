"use client";

import { useEffect, useState } from "react";

interface IUser {
    name?: string;
    email?: string;
    role?: string;
}
export default function ProfilePage() {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            async function fetchUser() {
        try {
            const res = await fetch("/api/auth/me", {
                credentials: "include",
            });
            
            if(res.ok) {
                const data = await res.json();
                setUser(data.user || data);
            }
            
        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Loading...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                Not Logged In
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="h-32 bg-linear-to-r from-indigo-500 to-blue-600" />
                <div className="p-6 mt-16">
                    <div className="flex justify-center">
                        <div className="w-32 h-32 rounded-full bg-white shadow flex items-center justify-center text-4xl font-bold text-indigo-600">
                            {user?.name?.[0] || "User"}
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>

                        <p className="text-gray-500">{user.email}</p>

                        <span className="inline-block mt-2 px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-700">{user.role}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-center">
                        <Stat title="Order" value="12" />
                        <Stat title="Products" value="5" />
                        <Stat title="Joined" value="2024" />
                    </div>

                    {/* Actions */}

                    <div className="flex justify-center gap-4 mt-8">
                        <button className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">Edit Profile</button>
                        <button className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">Change Password</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

interface StatProps {
    title: string;
    value: string;
}

function Stat({title, value}: StatProps) {
    return (
        <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-gray-500 text-sm">{title}</p>

            <h3 className="text-xl font-bold mt-1">{value}</h3>
        </div>
    );
}