import Link from "next/link";

export default function UserSidebar() {
    return (
        <aside className="w-full md:w-64 bg-gray-50 text-gray-800 p-3 md:p-4 rounded-xl flex flex-col gap-3 shadow-sm shrink-0">
            <h2 className="text-base md:text-lg font-bold text-gray-700 border-b pb-2 hidden md:block">
                حسابي الشخصي 👤
            </h2>
            
            <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                <Link 
                    href="/dashboard/user" 
                    className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-white md:bg-transparent border md:border-0 hover:bg-gray-200 transition text-xs md:text-sm font-medium whitespace-nowrap shadow-xs md:shadow-none"
                >
                    🏠 لوحة التحكم
                </Link>
                <Link 
                    href="/orders" 
                    className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-white md:bg-transparent border md:border-0 hover:bg-gray-200 transition text-xs md:text-sm font-medium whitespace-nowrap shadow-xs md:shadow-none"
                >
                    📦 طلباتي
                </Link>
                <Link 
                    href="/profile" 
                    className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-white md:bg-transparent border md:border-0 hover:bg-gray-200 transition text-xs md:text-sm font-medium whitespace-nowrap shadow-xs md:shadow-none"
                >
                    ⚙️ إعدادات الحساب
                </Link>
            </nav>
        </aside>
    );
}