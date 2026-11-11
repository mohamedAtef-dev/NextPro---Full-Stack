import Link from "next/link";

export default function AdminSidebar() {
    return (
        <aside className="w-full md:w-64 bg-gray-900 text-white p-3 md:p-4 rounded-xl flex flex-col gap-3 shadow-md shrink-0">
            <h2 className="text-base md:text-lg font-bold text-indigo-400 border-b border-gray-700 pb-2 hidden md:block">
                لوحة تحكم المشرف 🛡️
            </h2>
            
            {/* 
              flex-row + overflow-x-auto تجعل الروابط بجانب بعضها على الموبايل في مساحة صغيرة وصافية كالأزرار
              md:flex-col تعيدها عمودية على الكمبيوتر
            */}
            <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                <Link 
                    href="/dashboard/admin" 
                    className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-gray-800 md:bg-transparent hover:bg-gray-800 transition text-xs md:text-sm font-medium whitespace-nowrap"
                >
                    📊 الرئيسية
                </Link>
                <Link 
                    href="/dashboard/admin/products" 
                    className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-gray-800 md:bg-transparent hover:bg-gray-800 transition text-xs md:text-sm font-medium whitespace-nowrap"
                >
                    📦 المنتجات
                </Link>
                <Link 
                    href="/dashboard/admin/orders" 
                    className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-gray-800 md:bg-transparent hover:bg-gray-800 transition text-xs md:text-sm font-medium whitespace-nowrap"
                >
                    📋 الطلبات
                </Link>
                <Link 
                    href="/dashboard/admin/users" 
                    className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-gray-800 md:bg-transparent hover:bg-gray-800 transition text-xs md:text-sm font-medium whitespace-nowrap"
                >
                    👥 المستخدمين
                </Link>
            </nav>
        </aside>
    );
}