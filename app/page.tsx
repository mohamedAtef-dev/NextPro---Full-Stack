import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center px-4">
      <div className="max-w-3xl">
        {/* A small, colorful badge*/}
        <span className="px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full">
          مرحباً بك في مشروعك الجديد ✨
        </span>

        {/* Main Title*/}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-4 tracking-tight">
          ابنِ أفكارك بسرعة وذكاء مع <span className="text-indigo-600">Next.js</span>
        </h1>

        {/* Explanatory text*/}
        <p className="text-gray-500 mt-4 text-lg">
          هذه هي الصفحة الرئيسية لمشروعك. تصميم بسيط ونظيف، جاهز بالكامل لتبدأ في تعديله وإضافة مكوناتك الخاصة بكل سهولة.
        </p>

        {/* Interactive buttons*/}
        <div className="mt-8 flex justify-center gap-4">
          {/* Dashboard navigation button*/}
          <Link 
            href="/dashboard" 
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow"
          >
            استكشف المشروع
          </Link>

          <button className="px-6 py-3 rounded-lg border border-gray-300 font-medium text-gray-700 hover:bg-gray-50 transition">
            قراءة المستندات
          </button>
        </div>
      </div>
    </div>
  );
}