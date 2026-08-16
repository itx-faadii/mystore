"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWishlistStore } from "@/lib/store";
import { ProductCard } from "@/components/storefront/ProductCard";
import { QuickViewModal } from "@/components/storefront/QuickViewModal";
import { Product } from "@/lib/types";
import { Heart, Sparkles } from "lucide-react";

export default function WishlistPage() {
  const { items } = useWishlistStore();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 fill-brand-500 text-brand-500" />
          <span>Curated Favorites</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
          Your Beauty Wishlist
        </h1>
        <p className="text-xs text-foreground/60">
          Save your coveted skincare and makeup formulas to revisit anytime.
        </p>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center rounded-3xl bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10 max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-400 mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-foreground">
            Your wishlist is empty
          </h3>
          <p className="text-xs text-foreground/60">
            Explore our botanical formulations and tap the heart icon to save your favorites.
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-2.5 rounded-xl bg-brand-500 text-white text-xs font-semibold shadow-md hover:bg-brand-600 transition-colors"
          >
            Explore Catalog
          </Link>
        </div>
      )}

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
