"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ChangeEvent, type FormEvent, useState } from "react"

export default function LoginPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
// [e.target.name] => Input  اسم ال , e.target.value => القيمة اللي المستخدم كتبها 
        });
    }
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const res = await fetch("/api/login", {
            method: "POST",
            credentials: "include",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        
        if (!res.ok) {
            setError(data.message);
            return;
        }

        router.push("/dashboard");

    }

    return (
        <main className="min-h-screen flex items-center justify-center">

            <form className="bg-white p-6 rounded shadow w-96" onSubmit={handleSubmit}>

                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-3" />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-3" />

                <button className="bg-black text-white w-full py-2">Login</button>
                {error && (
                    <p className="mt-3 text-red-500 text-center">
                        {error}
                    </p>
                )}

                <div className="mt-5 pt-4 border-t text-center text-sm text-gray-600">
                    ليس لديك حساب؟{" "}
                    <Link 
                        href="/register" 
                        className="text-black font-semibold underline hover:text-indigo-600 transition"
                    >
                        إنشاء حساب جديد (Register)
                    </Link>
                </div>

            </form>

        </main>

        
    )
}