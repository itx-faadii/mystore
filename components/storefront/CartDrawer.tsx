"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export const CartDrawer = () => {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscountAmount,
    getShipping,
    getTotal,
  } = useCartStore();

  const [promoInput, setPromoInput] = useState("");
  const [promoFeedback, setPromoFeedback] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const shipping = getShipping();
  const total = getTotal();

  const freeShippingThreshold = 70;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyCoupon(promoInput);
    setPromoFeedback(res);
    if (res.success) {
      setPromoInput("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-white/90 dark:bg-obsidian/95 backdrop-blur-2xl border-l border-white/80 dark:border-white/10 shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-brand-100 dark:bg-white/10 text-brand-700 dark:text-brand-300">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-serif text-lg font-bold text-foreground">
                        Your Beauty Bag
                      </h2>
                      <span className="text-xs text-foreground/60">
                        {items.reduce((acc, i) => acc + i.quantity, 0)} items selected
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={closeCart}
                    className="p-2 rounded-full text-foreground/60 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Free Shipping Meter */}
                <div className="mt-4 p-3 rounded-2xl bg-brand-50/70 dark:bg-white/5 border border-brand-200/50">
                  <div className="flex items-center justify-between text-xs font-medium text-foreground mb-1.5">
                    <span className="flex items-center gap-1 text-brand-700 dark:text-brand-300">
                      <Sparkles className="w-3.5 h-3.5" />
                      {subtotal >= freeShippingThreshold
                        ? "Congratulations! You have unlocked Free Shipping"
                        : `Add ${formatPrice(remainingForFreeShipping)} more for FREE Express Shipping`}
                    </span>
                    <span className="font-bold">{Math.round(progressToFreeShipping)}%</span>
                  </div>
                  <div className="w-full h-2 bg-brand-200/40 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressToFreeShipping}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-brand-500 to-gold-400 rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center text-brand-400">
                      <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-semibold text-foreground">
                        Your bag is empty
                      </h3>
                      <p className="text-xs text-foreground/60 max-w-xs">
                        Indulge in botanical skincare and couture lip oils crafted to make you glow.
                      </p>
                    </div>
                    <button
                      onClick={closeCart}
                      className="px-6 py-2.5 rounded-xl bg-brand-500 text-white text-xs font-semibold hover:bg-brand-600 transition-colors shadow-md"
                    >
                      Explore Bestsellers
                    </button>
                  </div>
                ) : (
                  items.map((item, index) => {
                    const itemKey = `${item.product.id}-${item.selectedShade?.id || "none"}-${item.selectedSize || "none"}`;
                    return (
                      <motion.div
                        key={itemKey}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex gap-4 p-3.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10 shadow-sm"
                      >
                        {/* Thumbnail */}
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.name}
                          className="w-20 h-20 rounded-xl object-cover border border-white/60 shadow-xs"
                        />

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-serif text-sm font-semibold text-foreground line-clamp-1">
                                {item.product.name}
                              </h4>
                              <div className="flex flex-wrap gap-1.5 mt-1 text-[11px] text-foreground/60">
                                {item.selectedShade && (
                                  <span className="flex items-center gap-1 bg-white/70 dark:bg-white/10 px-2 py-0.5 rounded-md border border-border/50">
                                    <span
                                      className="w-2.5 h-2.5 rounded-full border border-black/10"
                                      style={{ backgroundColor: item.selectedShade.hexCode }}
                                    />
                                    {item.selectedShade.name}
                                  </span>
                                )}
                                {item.selectedSize && (
                                  <span className="bg-white/70 dark:bg-white/10 px-2 py-0.5 rounded-md border border-border/50">
                                    {item.selectedSize}
                                  </span>
                                )}
                              </div>
                            </div>

                            <button
                              onClick={() =>
                                removeItem(
                                  item.product.id,
                                  item.selectedShade?.id,
                                  item.selectedSize
                                )
                              }
                              className="text-foreground/40 hover:text-rose-600 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Price & Quantity Controls */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2 bg-white/80 dark:bg-white/10 rounded-lg p-1 border border-border/50">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1,
                                    item.selectedShade?.id,
                                    item.selectedSize
                                  )
                                }
                                className="p-1 hover:text-brand-600 text-foreground/70"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-semibold px-1.5 min-w-[20px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + 1,
                                    item.selectedShade?.id,
                                    item.selectedSize
                                  )
                                }
                                className="p-1 hover:text-brand-600 text-foreground/70"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <span className="text-sm font-bold text-foreground">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Drawer Footer (Checkout & Summary) */}
              {items.length > 0 && (
                <div className="p-6 border-t border-border/50 bg-white/60 dark:bg-obsidian/60 space-y-4">
                  {/* Promo Code Form */}
                  <div>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 text-xs">
                        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold">
                          <Tag className="w-3.5 h-3.5" />
                          <span>
                            {appliedCoupon.code} (
                            {appliedCoupon.type === "PERCENTAGE"
                              ? `${appliedCoupon.value}% OFF`
                              : `$${appliedCoupon.value} OFF`}
                            )
                          </span>
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="text-xs text-rose-600 hover:underline font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Promo code (e.g. LUMINA15)"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl text-xs glass-input uppercase placeholder:normal-case"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-brand-100 hover:bg-brand-200 text-brand-800 text-xs font-semibold transition-colors"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                    {promoFeedback && !appliedCoupon && (
                      <p
                        className={`text-[11px] mt-1 ${
                          promoFeedback.success ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {promoFeedback.message}
                      </p>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-foreground/70">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-foreground">{formatPrice(subtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                        <span>Discount Applied</span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Estimated Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-emerald-600 font-semibold">FREE</span>
                        ) : (
                          formatPrice(shipping)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-foreground pt-2 border-t border-border/50">
                      <span>Estimated Total</span>
                      <span className="text-base font-serif text-brand-600">{formatPrice(total)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-brand-500 via-brand-600 to-gold-500 hover:brightness-105 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-glass-lg transition-all active:scale-[0.99]"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-foreground/50">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>256-Bit SSL Encrypted • 30-Day Pure Radiance Guarantee</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
