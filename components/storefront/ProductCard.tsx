"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye, Sparkles } from "lucide-react";
import { Product, ShadeVariant } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { RatingStars } from "@/components/ui/RatingStars";
import { Badge } from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const [selectedShade, setSelectedShade] = useState<ShadeVariant | undefined>(
    product.shades?.[0]
  );
  const [isHovered, setIsHovered] = useState(false);
  const isLiked = isInWishlist(product.id);

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, selectedShade);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl bg-white/70 dark:bg-obsidian/70 backdrop-blur-xl border border-white/80 dark:border-white/10 p-4 transition-all duration-300 hover:shadow-glass-lg hover:border-brand-300/50 flex flex-col justify-between"
    >
      {/* Top Media Area */}
      <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-brand-50/50 dark:bg-white/5 mb-4">
        {/* Product Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.isBestSeller && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-gold-400 text-white shadow-sm tracking-wider uppercase flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <Badge variant="brand" className="text-[10px]">New Formula</Badge>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white shadow-sm">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-obsidian/80 backdrop-blur-md text-foreground/80 hover:text-brand-600 transition-transform active:scale-90 shadow-sm"
          aria-label="Toggle Wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isLiked ? "fill-brand-500 text-brand-500" : ""
            }`}
          />
        </button>

        {/* Product Image Link */}
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            loading="lazy"
          />
        </Link>

        {/* Hover Quick Action Buttons */}
        <div
          className={`absolute inset-x-3 bottom-3 z-10 flex gap-2 transition-all duration-300 ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2.5 px-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-lg transition-all active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>

          {onQuickView && (
            <button
              onClick={handleQuickView}
              className="p-2.5 rounded-xl bg-white/90 dark:bg-obsidian/90 text-foreground hover:text-brand-600 backdrop-blur-md shadow-md transition-all active:scale-95"
              aria-label="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Info Area */}
      <div className="flex flex-col flex-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-1 text-xs">
          <span className="uppercase tracking-wider text-[11px] font-semibold text-brand-600 dark:text-brand-400">
            {product.category}
          </span>
          <RatingStars rating={product.rating} size="sm" showCount count={product.reviewCount} />
        </div>

        {/* Product Title */}
        <Link href={`/products/${product.slug}`} className="group-hover:text-brand-600 transition-colors">
          <h3 className="font-serif text-base font-semibold text-foreground line-clamp-1 mb-1">
            {product.name}
          </h3>
        </Link>

        {/* Key Skin Concern Badge */}
        {product.concerns?.[0] && (
          <p className="text-xs text-foreground/60 mb-2 truncate">
            {product.concerns[0]} • {product.skinTypes?.[0] || "All Skin"}
          </p>
        )}

        {/* Shade Swatches Preview */}
        {product.shades && product.shades.length > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            {product.shades.map((shade) => (
              <button
                key={shade.id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedShade(shade);
                }}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedShade?.id === shade.id
                    ? "ring-2 ring-brand-500 scale-110 border-white"
                    : "border-black/20 hover:scale-105"
                }`}
                style={{ backgroundColor: shade.hexCode }}
                title={shade.name}
              />
            ))}
            <span className="text-[10px] text-foreground/50 ml-1">
              {product.shades.length} shades
            </span>
          </div>
        )}

        {/* Price & Stock */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/40">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs line-through text-foreground/40 font-normal">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
              product.stock > 10
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                : product.stock > 0
                ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            {product.stock > 10 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} Left` : "Sold Out"}
          </span>
        </div>
      </div>
    </div>
  );
};
