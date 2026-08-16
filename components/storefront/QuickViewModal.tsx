"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product, ShadeVariant } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";
import { formatPrice } from "@/lib/utils";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { RatingStars } from "@/components/ui/RatingStars";
import { ShoppingBag, Heart, Check, ArrowRight } from "lucide-react";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedShade, setSelectedShade] = useState<ShadeVariant | undefined>(
    product?.shades?.[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) return null;

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedShade, selectedSize);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square w-full rounded-2xl overflow-hidden bg-brand-50/50 dark:bg-white/5 border border-white/60">
            <img
              src={product.images[selectedImage] || product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-brand-500 scale-105 shadow-sm"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-brand-600 font-bold">
              {product.brand} • {product.category}
            </span>
            <h2 className="font-serif text-2xl font-bold text-foreground mt-1">
              {product.name}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <RatingStars rating={product.rating} size="sm" showCount count={product.reviewCount} />
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-base line-through text-foreground/40 font-normal">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <p className="text-xs text-foreground/70 leading-relaxed line-clamp-3">
            {product.description}
          </p>

          {/* Shades Picker */}
          {product.shades && product.shades.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-foreground">
                Select Shade: {selectedShade?.name || product.shades[0].name}
              </span>
              <div className="flex flex-wrap gap-2">
                {product.shades.map((shade) => (
                  <button
                    key={shade.id}
                    onClick={() => setSelectedShade(shade)}
                    className={`w-7 h-7 rounded-full border-2 transition-all relative flex items-center justify-center ${
                      selectedShade?.id === shade.id
                        ? "border-brand-600 scale-110 shadow-sm"
                        : "border-white/80 opacity-85 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: shade.hexCode }}
                    title={shade.name}
                  >
                    {selectedShade?.id === shade.id && (
                      <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 1 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-foreground">Select Size</span>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                      selectedSize === size
                        ? "bg-brand-500 text-white border-brand-500 shadow-sm"
                        : "bg-white/50 dark:bg-white/5 text-foreground border-border/60 hover:bg-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border/50">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 px-6 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag</span>
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className="p-3 rounded-2xl bg-white/70 dark:bg-white/10 border border-border/60 text-foreground hover:text-brand-600 transition-colors"
              aria-label="Wishlist"
            >
              <Heart
                className={`w-5 h-5 ${
                  isLiked ? "fill-brand-500 text-brand-500" : ""
                }`}
              />
            </button>
          </div>

          <div className="text-center pt-2">
            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="text-xs font-semibold text-brand-600 hover:underline inline-flex items-center gap-1"
            >
              <span>View Full Product Ritual & Ingredients</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};
