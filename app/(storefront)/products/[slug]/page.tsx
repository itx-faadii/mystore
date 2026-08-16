"use client";

import React, { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Check,
  Leaf,
  Plus,
  Minus,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { useAdminStore, useCartStore, useWishlistStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { RatingStars } from "@/components/ui/RatingStars";
import { ProductCard } from "@/components/storefront/ProductCard";
import { ShadeVariant } from "@/lib/types";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const products = useAdminStore((state) => state.products);
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const product = products.find((p) => p.slug === slug);

  const [activeImage, setActiveImage] = useState<number>(0);
  const [selectedShade, setSelectedShade] = useState<ShadeVariant | undefined>(
    product?.shades?.[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"benefits" | "howToUse" | "ingredients" | "reviews">("benefits");
  
  // New review state
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold">Product Not Found</h2>
        <p className="text-sm text-foreground/60">The requested beauty formula could not be located.</p>
        <Link href="/products" className="inline-block px-6 py-2.5 rounded-xl bg-brand-500 text-white text-xs font-semibold">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isLiked = isInWishlist(product.id);
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedShade, selectedSize);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewContent) return;
    setReviewSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-foreground/60">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-brand-600">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium truncate">{product.name}</span>
      </nav>

      {/* Main Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Hero Image */}
          <motion.div
            layoutId={`prod-img-${product.id}`}
            className="aspect-square w-full rounded-3xl overflow-hidden bg-brand-50/50 dark:bg-white/5 border border-white/80 dark:border-white/10 shadow-glass relative group"
          >
            <img
              src={product.images[activeImage] || product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-gold-400 text-white shadow-md uppercase tracking-wider">
                Bestseller Ritual
              </span>
            )}
          </motion.div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImage === idx
                      ? "border-brand-500 scale-105 shadow-md ring-2 ring-brand-200"
                      : "border-white/70 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Buy Box (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white/70 dark:bg-obsidian/70 backdrop-blur-xl border border-white/80 dark:border-white/10 p-6 sm:p-8 shadow-glass-lg space-y-6">
          {/* Header */}
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-600 font-bold">
              {product.brand} • {product.category}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mt-1">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mt-2.5">
              <RatingStars rating={product.rating} size="sm" showCount count={product.reviewCount} />
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-border/50">
            <span className="text-3xl font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-lg line-through text-foreground/40 font-normal">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            {product.compareAtPrice && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                Save {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Short Bio */}
          <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
            {product.description}
          </p>

          {/* Shade Swatches Picker */}
          {product.shades && product.shades.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-foreground">Select Shade</span>
                <span className="text-brand-600 font-medium">{selectedShade?.name || product.shades[0].name}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.shades.map((shade) => (
                  <button
                    key={shade.id}
                    onClick={() => setSelectedShade(shade)}
                    className={`w-8 h-8 rounded-full border-2 transition-all relative flex items-center justify-center ${
                      selectedShade?.id === shade.id
                        ? "border-brand-600 scale-110 shadow-md ring-2 ring-brand-200"
                        : "border-white/80 opacity-85 hover:opacity-100 hover:scale-105"
                    }`}
                    style={{ backgroundColor: shade.hexCode }}
                    title={shade.name}
                  >
                    {selectedShade?.id === shade.id && (
                      <Check className="w-4 h-4 text-white drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes Picker */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-foreground">Select Size</span>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                      selectedSize === size
                        ? "bg-brand-500 text-white border-brand-500 shadow-sm"
                        : "bg-white/60 dark:bg-white/5 text-foreground border-border/60 hover:bg-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart Row */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Picker */}
              <div className="flex items-center bg-white/80 dark:bg-white/10 rounded-xl p-1 border border-border/60">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-foreground/70 hover:text-brand-600"
                  aria-label="Decrease Quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold px-3 min-w-[28px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-foreground/70 hover:text-brand-600"
                  aria-label="Increase Quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 hover:brightness-105 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-glass-lg transition-all active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Beauty Bag • {formatPrice(product.price * quantity)}</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className="p-3.5 rounded-2xl bg-white/70 dark:bg-white/10 border border-border/60 text-foreground hover:text-brand-600 transition-colors shadow-sm"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-brand-500 text-brand-500" : ""}`} />
              </button>
            </div>

            {/* Stock Notification */}
            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>In Stock — Ready to ship from Paris / New York</span>
            </p>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 border-t border-border/50 grid grid-cols-2 gap-3 text-xs text-foreground/70">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Free Shipping $70+</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Dermatologist Tested</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-brand-600 shrink-0" />
              <span>100% Clean & Vegan</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-brand-600 shrink-0" />
              <span>30-Day Radiant Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI-Structured Information Tabs */}
      <section className="rounded-3xl bg-white/70 dark:bg-obsidian/70 backdrop-blur-xl border border-white/80 dark:border-white/10 p-6 sm:p-10 shadow-glass">
        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border/50 pb-4 mb-8">
          {[
            { id: "benefits", label: "Key Benefits" },
            { id: "howToUse", label: "Ritual & How to Use" },
            { id: "ingredients", label: "Clean Ingredients (INCI)" },
            { id: "reviews", label: `Reviews (${product.reviewCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-brand-500 text-white shadow-md"
                  : "text-foreground/70 hover:bg-brand-50/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Benefits */}
        {activeTab === "benefits" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-foreground">Transformative Clinical Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.benefits?.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10">
                  <div className="p-1 rounded-full bg-brand-100 text-brand-700 mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 2: How to Use */}
        {activeTab === "howToUse" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h3 className="font-serif text-xl font-bold text-foreground">The Application Ceremony</h3>
            <div className="space-y-3">
              {product.howToUse?.map((step, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10">
                  <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-400 to-gold-400 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 3: Ingredients */}
        {activeTab === "ingredients" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-foreground">Botanical & Clean Active Profile</h3>
            <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10">
              <p className="text-xs sm:text-sm font-mono text-foreground/75 leading-relaxed">
                {product.ingredients}
              </p>
            </div>
            <p className="text-xs text-foreground/50">
              Formulated without parabens, phthalates, synthetic fragrance, sulfates, or microplastics. 100% Leaping Bunny certified cruelty-free.
            </p>
          </motion.div>
        )}

        {/* Tab 4: Reviews */}
        {activeTab === "reviews" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border/50 pb-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground">Verified Client Reviews</h3>
                <div className="flex items-center gap-2 mt-1">
                  <RatingStars rating={product.rating} size="md" showCount count={product.reviewCount} />
                  <span className="text-xs text-foreground/60">Based on verified purchases</span>
                </div>
              </div>
            </div>

            {/* Leave a Review Form */}
            <div className="p-6 rounded-2xl bg-brand-50/50 dark:bg-white/5 border border-brand-200/50 space-y-4">
              <h4 className="font-serif text-base font-semibold text-foreground">Share Your Experience</h4>
              {reviewSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  Thank you! Your verified review has been submitted for moderation.
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name (e.g. Charlotte H.)"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      required
                      className="px-3.5 py-2 rounded-xl glass-input text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Review Headline"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      required
                      className="px-3.5 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Describe how the texture feels, scent, and transformative results on your skin..."
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-brand-500 text-white text-xs font-semibold hover:bg-brand-600 transition-colors shadow-sm"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Complete the Ritual
            </h2>
            <Link href={`/products?category=${product.category}`} className="text-xs font-semibold text-brand-600 hover:underline">
              View Category
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
