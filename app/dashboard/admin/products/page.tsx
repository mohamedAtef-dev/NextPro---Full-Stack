"use client";

import { useEffect, useState } from "react";

interface Product {
_id: string;
    name: string;
    price:  string;
    description: string;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);

        const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
    });
    
    // string => If there’s a product, we’ll modify it.
    // null => If we aren’t modifying any product
    // Editing State
    const [editingId, setEditingId] = useState<string | null>(null);

    const fetchProducts = async (signal?: AbortSignal) => { // دي علشان نقدر نلغي طلب جلب المنتجات لو المستخدم خرج من الصفحة قبل ما الطلب يخلص.

        const res = await fetch("/api/products", {signal});

        if (!res.ok) {
            throw new Error('Failed to fetch products')
        }
        const data = await res.json();

        setProducts(data);

    };
    
useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
        try {
            await fetchProducts(controller.signal);
        } catch (err) {
            if (err instanceof Error && err.name !== "AbortError") {
                console.error("Failed to load products:", err);
            }
        }
    };

    loadProducts();

    return () => {
        controller.abort();
    };
}, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const url = editingId ? `/api/products/${editingId}` : '/api/products';

        const method = editingId ? 'PUT' : 'POST';
        const res = await fetch(url, {
            method,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form), // // Because the data needs to be in text format when sending JSON in the (fetch) body.
        });
        if (!res.ok) {
            throw new Error("Failed to save product");
        }

        setForm({name: "", price: "", description: ""}); // Empty Form

        setEditingId(null);

        fetchProducts(); //To return the form to "add" mode instead of "edit" mode.

};

    // Function Delete
    const handleDelete = async(id: string) => {
        if(!confirm("هل أنت متأكد من الحذف؟")) return;

        await fetch(`/api/products/${id}`, {
            method: "DELETE",
        });
        fetchProducts(); // Product Updates
    };

    // Function Edit 
    const handleEdit = (product: Product) => { 

        setForm({
            name: product.name,
            price: product.price,
            description: product.description,
        });

        setEditingId(product._id); // المنتج اللي بنعدله ID هنا بنحفظ 
    };
    // Cancel Edit
    const cancelEdit = () => {
        setForm({
            name: "",
            price: "",
            description: "",
        });
        setEditingId(null);
    }

    return (
        <div className="min-h-screen py-10 px-4">
            <div className="max-w-6xl">
                <div className="flex items-center justify-between">

                    <h1 className="text-2xl font-bold mb-6">
                        ادارة المنتجات 
                    </h1>

                    <span className="text-sm text-gray-500">Total: {products.length}</span>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow p-6 mb-5">
                    <h2 className="text-lg font-semibold mb-4">
                        {editingId ? "تعديل المنتج" : "أضافة منتج"}
                    </h2>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm mb-1">
                                اسم المنتج
                            </label>

                            <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="اسم المنتج"
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none" 
                            required    
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm mb-1">
                            السعر 
                            </label>

                            <input
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="السعر"
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none" 
                            required
                            />
                        </div>
                        
                        <div className="md:col-span-2">
                            <label className="block text-sm mb-1">
                                الوصف
                            </label>

                            <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full border py-2 rounded-lg px-3 focus:ring-2 focus:ring-black outline-none" 
                            />
                        </div>

                        <div className="md:col-span-2 flex gap-3 pt-2">
                            <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
                                {editingId ? "حفظ التعديلات" : "إضافة"}
                            </button>
                            
                            {editingId && (
                                <button type="button"
                                onClick={cancelEdit}
                                className="border px-6 py-2 rounded-lg hover:bg-gray-100">
                                    إلغاء
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="px-4 py-3">المنتج</th>
                                <th className="px-4 py-3">السعر</th>
                                <th className="px-4 py-3 text-center">التحكم</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.length === 0 && (
                                <tr>
                                    <td className="text-center py-6 text-gray-500">لايوجد منتجات</td>
                                </tr>
                            )}
                            
                            {products.map((p) => (
                                <tr key={p._id} className="border-t hover:bg-gray-50 transition">
                                    <td className="px-4 py-3 font-semibold">{p.name}</td>
                                    <td className="px-4 py-3">${p.price}</td>

                                    <td className="px-4 py-3 text-center space-x-3">
                                        <button onClick={() => handleEdit(p)} className="text-blue-600 hover:underline">
                                            تعديل 
                                        </button>

                                        <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:underline">
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}