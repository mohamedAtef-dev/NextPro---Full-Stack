"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "../AdminSidebar";

interface IUser {
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    createdAt: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchUsersList() {
            try {
                const res = await fetch("/api/admin/users");
                const data = await res.json();
                if (res.ok) {
                    setUsers(data);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchUsersList();
    }, []);

    // A function to change permissions when the upgrade button is clicked or when admin status is revoked.
    async function handleToggleRole(userId: string, currentRole: string) {
        const newRole = currentRole === "admin" ? "user" : "admin";
        
        if (!confirm(`هل أنت متأكد من تغيير صلاحية هذا المستخدم إلى (${newRole})؟`)) return;

        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "فشل التحديث");
                return;
            }

            setMessage("تم تحديث الصلاحية بنجاح! ✅");
            
            setUsers(users.map(user => 
                user._id === userId ? { ...user, role: newRole } : user
            ));

            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-6 p-4 sm:p-6 max-w-7xl mx-auto min-h-screen">
            
            {/* Admin Sidebar Menu*/}
            <div className="w-full md:w-64 shrink-0">
                <AdminSidebar />
            </div>

            {/* Main content of the user management page*/}
            <main className="flex-1 bg-white p-4 sm:p-6 rounded-xl shadow border overflow-hidden">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">
                    👥 إدارة المستخدمين والصلاحيات
                </h1>
                <p className="text-gray-500 mb-6 text-sm">
                    من هنا يمكنك التحكم بصلاحيات حسابات المستخدمين وترقيتهم إلى مشرفين بضغطة زر.
                </p>

                {message && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                        {message}
                    </div>
                )}

                {loading ? (
                    <p className="text-center text-gray-500 py-12">جاري تحميل المستخدمين...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b text-gray-700 text-sm">
                                    <th className="p-3">الاسم</th>
                                    <th className="p-3">البريد الإلكتروني</th>
                                    <th className="p-3">الصلاحية الحالية</th>
                                    <th className="p-3 text-center">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="border-b hover:bg-gray-50 text-sm">
                                        <td className="p-3 font-medium text-gray-800">{user.name}</td>
                                        <td className="p-3 text-gray-600">{user.email}</td>
                                        <td className="p-3">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                user.role === "admin" 
                                                    ? "bg-purple-100 text-purple-700" 
                                                    : "bg-blue-100 text-blue-700"
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() => handleToggleRole(user._id, user.role)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                                                    user.role === "admin"
                                                        ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                                                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                                                }`}
                                            >
                                                {user.role === "admin" ? "سحب الأدمن" : "ترقية لأدمن"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}