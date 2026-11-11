"use client";

import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import AdminSidebar from "./admin/AdminSidebar";

interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
}

export default function Dashboard() {

    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const {addToCart} = useCart();

useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('/api/products');
                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await res.json(); 

                setProducts(Array.isArray(data) ? data : data.products || []);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

return (
        /* 
          استخدمنا هنا flex-col للموبايل، وتتحول تلقائياً إلى flex-row ابتداءً من شاشات الـ md (الكمبيوتر) 
        */
        <div className="flex flex-col md:flex-row gap-6 p-4 sm:p-6 max-w-7xl mx-auto min-h-screen">
            
            {/* القائمة الجانبية: تأخذ عرض الشاشة بالكامل على الموبايل، وعرض ثابت على الكمبيوتر */}
            <div className="w-full md:w-64 shrink-0">
                <AdminSidebar />
            </div>

            {/* محتوى الصفحة الرئيسي */}
            <main className="flex-1 bg-white p-4 sm:p-6 rounded-xl shadow border overflow-hidden">
                <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
                    إدارة المنتجات (لوحة المشرف) 🛡️
                </h1>

                {loading ? (
                    <p className="text-center text-gray-500 py-12">Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {products.map((product) => (
                            <ProductsCard key={product._id} product={product} addToCart={addToCart}/>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

interface ProductsCardProps {
    product: IProduct;
    addToCart: (product: IProduct) => void;
}

function ProductsCard({product, addToCart}: ProductsCardProps) {
    return (
        <div className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden group">

            <div className="h-48 bg-linear-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-105 transition duration-300">
                {product.name[0]}
            </div>

            <div className="p-5">

                <h3 className="text-lg font-semibold mb-1 truncate">{product.name}</h3>

                <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>

                <div className="flex justify-between items-center mt-4">

                    <span className="text-xl font-bold text-indigo-600">${product.price}</span>

                    <button onClick={() => addToCart(product)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition">
                        Add to Cart
                    </button> 

                </div>

            </div>

        </div>
    );
}
