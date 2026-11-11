"use client";

import { createContext, useContext, useState, type ReactNode, useEffect } from "react";

interface IProduct {
    _id: string;
    name: string;
    price: number;
    description?: string;
    quantity?: number;
}

interface CartContextType {
    cart: IProduct[];
    isInitialized: boolean;
    addToCart: (product: IProduct) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({children}: {children: ReactNode}) {
        const [cart, setCart] = useState<IProduct[]>([]);
        const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const loadCart = () => {
            try {
                const saved = localStorage.getItem("cart");

                if (saved) {
                    const parsedCart = JSON.parse(saved);

                    if (Array.isArray(parsedCart)) {
                        setCart(parsedCart);
                    }
                }
            } catch (error) {
                console.error("Failed to load cart:", error);
            }

            setIsInitialized(true);
        };

        const frameId = requestAnimationFrame(loadCart);

        return () => cancelAnimationFrame(frameId);
    }, []);


        useEffect(() => {
        if (!isInitialized) return;

        localStorage.setItem("cart", JSON.stringify(cart));

    }, [cart, isInitialized]);

    function addToCart(product: IProduct) {
        setCart((prev) => {
            const exist = prev.find(
                (i) => i._id === product._id
            );

            if(exist) {
                return prev.map((i) => 
                    i._id === product._id ? {...i, quantity: (i.quantity || 1) + 1} : i
                );
            }
            return [...prev, {...product, quantity: 1}];
        });
    }

    function removeFromCart(id: string) {
        setCart((prev) => 
        prev.filter((i) => i._id !== id)
        );
    }

    function clearCart() {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{cart, isInitialized, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );

}

export function useCart() {
    const context = useContext(CartContext);
    if(!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}