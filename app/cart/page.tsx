"use client";

import { useCart } from "../context/CartContext";

interface IProduct {
    _id?: string;
    name: string;
    price: number;
    quantity?: number;
}
    //Cartpage => Responsible for displaying the products in the cart and calculating the total.
export default function Cartpage() {
    const {cart, removeFromCart, clearCart, isInitialized} = useCart();

    if (!isInitialized) {
    return <p className="p-6">Loading cart...</p>;
}
    
    // Calculating the total price
    const total = cart.reduce(
        (sum, i) => sum + i.price * (i.quantity || 1),
        0 // Initial value
    )

    return(
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

            {cart.length === 0 && (
                <p className="text-gray-500">Cart is empty</p>
            )}

            {cart.map((item, i) => (
                <div key={item._id || i} className="flex justify-between border-b py-3">
                    <div>
                        <p className="font-medium">{item.name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Qty:{item.quantity}</p>
                    </div>

                    <div className="flex gap-4 items-center">
                        <span>
                            ${item.price * (item.quantity || 1)}
                        </span>

                        <button onClick={() => item._id && removeFromCart(item._id)} className="text-red-500">
                            Remove
                        </button>
                    </div>
                </div>
            ))}

            <div className="flex justify-between mt-6 text-lg font-bold">
                <span>Total</span>
                <span>${total}</span>
            </div>

            <button onClick={() => checkout(cart, total, clearCart)} className="mt-6 bg-black text-white px-6 py-2 rounded">
                Checkout
            </button>
        </div>
    );
}

// checkout => Responsible for sending the request to the API and saving it to MongoDB.
async function checkout(cart: IProduct[], total: number, clearCart: () => void) {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    // Ensure that each item contains the product ID and quantity correctly
    const items = cart.map((i) => ({
        product: i._id,
        quantity: i.quantity || 1,
    }));

    // A quick check before sending to ensure there are no products without an ID.
    const hasInvalidItem = items.some((i) => !i.product);
    if (hasInvalidItem) {
        alert("Some items in the cart are missing valid product IDs.");
        return;
    }

    try {
        const res = await fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                items,
                totalPrice: total,
            }),
        });

        const data = await res.json();

        if (res.ok) {
            clearCart();
            alert("Order created successfully!");
        } else {
            console.error("Server validation error:", data);
            alert(data.message || "Checkout failed!");
        }
    } catch (err) {
        console.error("Network error during checkout:", err);
        alert("Something went wrong during checkout.");
    }
}