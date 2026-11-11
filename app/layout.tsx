import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "./context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextPro",
  description: "A fast and secure management dashboard built with Next.js to track data and handle tasks efficiently.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className= {`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full">

        <CartProvider>
        <Header/>

        <main className="max-w-6xl mx-auto px-4 py-6">
          

          {children}
          
        </main>

        </CartProvider>
      </body>
    </html>
  );
}
