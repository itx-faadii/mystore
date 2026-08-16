import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { CartDrawer } from "@/components/storefront/CartDrawer";
import { FloatingChatWidget } from "@/components/chat/FloatingChatWidget";

export const metadata: Metadata = {
  title: "FAADII | Haute Skincare & Cosmetics",
  description:
    "Discover award-winning clean skincare, whipped peptide creams, mirror-shine lip oils, and rare extrait de parfums crafted with botanical bio-actives.",
  keywords: [
    "cosmetics",
    "clean beauty",
    "skincare",
    "lip oil",
    "hyaluronic acid serum",
    "luxury beauty",
    "vegan makeup",
  ],
  authors: [{ name: "FAADII Cosmetics" }],
  openGraph: {
    title: "FAADII | Clean Luxury Cosmetics & Skincare",
    description:
      "Transformative botanical formulas delivering radiant glass skin. Enjoy complimentary shipping on orders over $70.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased selection:bg-brand-200 selection:text-brand-900 min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <FloatingChatWidget />
      </body>
    </html>
  );
}
