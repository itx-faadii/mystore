"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAdminStore } from "@/lib/store";
import { ProductCard } from "@/components/storefront/ProductCard";
import { FacetedFilters } from "@/components/storefront/FacetedFilters";
import { QuickViewModal } from "@/components/storefront/QuickViewModal";
import { Product } from "@/lib/types";
import { LayoutGrid, ListFilter, Sparkles } from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialBestSeller = searchParams.get("bestSeller") === "true";

  const products = useAdminStore((state) => state.products);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSkinType, setSelectedSkinType] = useState<string>("All");
  const [selectedConcern, setSelectedConcern] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(150);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (searchParams.get("category")) {
      setSelectedCategory(searchParams.get("category")!);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (p.isArchived) return false;
        if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
        if (selectedSkinType !== "All" && !p.skinTypes?.includes(selectedSkinType)) return false;
        if (selectedConcern !== "All" && !p.concerns?.includes(selectedConcern)) return false;
        if (p.price > maxPrice) return false;
        if (initialBestSeller && !p.isBestSeller) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return 0; // default featured
      });
  }, [products, selectedCategory, selectedSkinType, selectedConcern, maxPrice, sortBy, initialBestSeller]);

  const handleReset = () => {
    setSelectedCategory("All");
    setSelectedSkinType("All");
    setSelectedConcern("All");
    setMaxPrice(150);
    setSortBy("featured");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100/70 text-brand-800 text-xs font-semibold uppercase tracking-widest mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Haute Beauty Catalog</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground">
          {selectedCategory === "All" ? "All Formulations" : selectedCategory}
        </h1>
        <p className="text-sm text-foreground/70">
          Discover clinical-grade active botanicals, whipped creams, and light-reflecting makeup.
        </p>
      </div>

      {/* Main Grid with Sidebar Filters */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Filters Sidebar */}
        <FacetedFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedSkinType={selectedSkinType}
          onSkinTypeChange={setSelectedSkinType}
          selectedConcern={selectedConcern}
          onConcernChange={setSelectedConcern}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          onReset={handleReset}
        />

        {/* Products Grid */}
        <div className="flex-1 w-full space-y-6">
          {/* Top Results Bar */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10 backdrop-blur-md">
            <span className="text-xs text-foreground/70 font-medium">
              Showing <strong>{filteredProducts.length}</strong> luxury products
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground/50 hidden sm:inline">Clean, Vegan & Cruelty-Free</span>
            </div>
          </div>

          {/* Grid Cards */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/50 dark:bg-white/5 rounded-3xl border border-white/60 p-8 space-y-4">
              <h3 className="font-serif text-xl font-semibold text-foreground">
                No formulations matched your filters
              </h3>
              <p className="text-xs text-foreground/60 max-w-sm mx-auto">
                Try widening your price range or clearing skin concern filters to view all products.
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-brand-500 text-white text-xs font-semibold shadow-md hover:bg-brand-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-foreground/60">Loading beauty catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
