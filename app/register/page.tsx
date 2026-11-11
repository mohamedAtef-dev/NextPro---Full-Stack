"use client"
import { type ChangeEvent, type FormEvent, useState } from "react"

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
// [e.target.name] => Input  اسم ال , e.target.value => القيمة اللي المستخدم كتبها 
        });
    }
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const res = await fetch("/api/register", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        setMessage(data.message);
    }

    return (
        <main className="min-h-screen flex items-center justify-center">

            <form className="bg-white p-6 rounded shadow w-96" onSubmit={handleSubmit}>

                <h1 className="text-2xl font-bold mb-4">Register</h1>
                <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full mb-3" />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-3" />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-3" />

                <button className="bg-black text-white w-full py-2">Register</button>
                {message && (
                    <p className="mt-3 text-center">
                        {message}
                    </p>
                )}

            </form>
        </main>
    )
}