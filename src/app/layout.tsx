import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LuxeLine | Modern Fashion Store",
  description: "A stylish e-commerce storefront for premium everyday fashion essentials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#fffaf7] text-stone-800`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
