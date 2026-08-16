"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Tag,
  ArrowRight,
  Sparkles,
  Lock,
  QrCode,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCartStore, useAdminStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { Order } from "@/lib/types";

export default function CheckoutPage() {
  const {
    items,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscountAmount,
    getShipping,
    getTax,
    getTotal,
    clearCart,
  } = useCartStore();

  const { createOrder } = useAdminStore();

  const [step, setStep] = useState<"details" | "success">("details");
  const [createdOrderNumber, setCreatedOrderNumber] = useState<string>("");

  // Form states
  const [email, setEmail] = useState("audrey.m@example.com");
  const [firstName, setFirstName] = useState("Audrey");
  const [lastName, setLastName] = useState("Hepburn-Miller");
  const [street, setStreet] = useState("742 Evergreen Terrace");
  const [city, setCity] = useState("Beverly Hills");
  const [state, setState] = useState("CA");
  const [postalCode, setPostalCode] = useState("90210");
  const [country, setCountry] = useState("United States");
  const [paymentMethod, setPaymentMethod] = useState<"Scan QR Pay" | "JazzCash / Easypaisa" | "Bank Transfer" | "Cash on Delivery">("Scan QR Pay");

  // Promo
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [promoMsg, setPromoMsg] = useState<{ success: boolean; message: string } | null>(null);

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShipping();
  const tax = getTax();
  const total = getTotal();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;
    const res = applyCoupon(promoCodeInput);
    setPromoMsg(res);
    if (res.success) setPromoCodeInput("");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNum = `LUM-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      customerName: `${firstName} ${lastName}`,
      customerEmail: email,
      items: [...items],
      subtotal,
      discountAmount: discount,
      tax,
      shippingCost: shipping,
      totalAmount: total,
      couponCode: appliedCoupon?.code,
      status: "PROCESSING",
      shippingAddress: {
        street,
        city,
        state,
        postalCode,
        country,
      },
      paymentMethod,
      paymentStatus: "PAID",
      createdAt: new Date().toISOString(),
    };

    createOrder(newOrder);
    setCreatedOrderNumber(orderNum);
    setStep("success");
    clearCart();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#cf6766", "#dfb87c", "#fbe8e7", "#c58133"],
      });
    } catch {}
  };

  if (step === "success") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl bg-white/80 dark:bg-obsidian/85 backdrop-blur-2xl border border-white/80 dark:border-white/10 p-8 sm:p-12 shadow-2xl text-center space-y-6"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 mx-auto flex items-center justify-center shadow-glass">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-brand-600 font-bold">
              Order Confirmed & Sealed
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              Thank You for Your Order
            </h1>
            <p className="text-sm text-foreground/70 max-w-md mx-auto">
              Your ritual is being prepared with organic botanicals. A confirmation email has been dispatched to <strong>{email}</strong>.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-brand-50/70 dark:bg-white/5 border border-brand-200/50 max-w-md mx-auto text-left space-y-3">
            <div className="flex justify-between text-xs text-foreground/70">
              <span>Order Reference:</span>
              <strong className="text-foreground font-mono">{createdOrderNumber}</strong>
            </div>
            <div className="flex justify-between text-xs text-foreground/70">
              <span>Delivery To:</span>
              <span className="text-foreground">{street}, {city}</span>
            </div>
            <div className="flex justify-between text-xs text-foreground/70">
              <span>Status:</span>
              <span className="text-emerald-600 font-bold">Processing in Boutique</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/account"
              className="px-6 py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-medium text-xs shadow-md transition-colors"
            >
              Track in Account
            </Link>
            <Link
              href="/products"
              className="px-6 py-3 rounded-2xl bg-white/70 dark:bg-white/10 hover:bg-white text-foreground font-medium text-xs border border-border/60 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">Your Bag is Empty</h2>
        <p className="text-xs text-foreground/60">Please add luxury formulas before checking out.</p>
        <Link href="/products" className="inline-block px-6 py-2.5 rounded-xl bg-brand-500 text-white text-xs font-semibold">
          Discover Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-1">
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Haute Checkout
        </h1>
        <p className="text-xs text-foreground/60 flex items-center justify-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit Encrypted Secure Checkout</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Shipping & Payment Forms (7 cols) */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-8">
          {/* Section 1: Customer Info */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-obsidian/70 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass space-y-4">
            <h2 className="font-serif text-lg font-semibold text-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>Contact Information</span>
            </h2>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-foreground/70 mb-1 block">Email for Order Updates</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl glass-input text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Address */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-obsidian/70 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass space-y-4">
            <h2 className="font-serif text-lg font-semibold text-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>Delivery Address</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-foreground/70 mb-1 block">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl glass-input text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground/70 mb-1 block">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl glass-input text-xs"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-foreground/70 mb-1 block">Street Address</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl glass-input text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground/70 mb-1 block">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl glass-input text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground/70 mb-1 block">State / Region</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl glass-input text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground/70 mb-1 block">Postal Code</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl glass-input text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground/70 mb-1 block">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl glass-input text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-obsidian/70 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass space-y-4">
            <h2 className="font-serif text-lg font-semibold text-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>Payment Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: "Scan QR Pay", label: "Scan QR Code", icon: QrCode, subtitle: "Instant QR Pay" },
                { id: "JazzCash / Easypaisa", label: "JazzCash / Easypaisa", icon: Sparkles, subtitle: "Advance Mobile Pay" },
                { id: "Bank Transfer", label: "Direct Bank Transfer", icon: ShieldCheck, subtitle: "Online IBAN Pay" },
                { id: "Cash on Delivery", label: "Cash on Delivery", icon: Truck, subtitle: "Pay Upon Delivery" },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between gap-1.5 transition-all ${
                      paymentMethod === m.id
                        ? "bg-brand-50/80 dark:bg-white/10 border-brand-500 ring-2 ring-brand-200"
                        : "bg-white/50 dark:bg-white/5 border-border/50 hover:bg-white"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-brand-600" />
                    <div>
                      <span className="text-xs font-semibold text-foreground block">{m.label}</span>
                      <span className="text-[10px] text-foreground/50">{m.subtitle}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {paymentMethod === "Scan QR Pay" && (
              <div className="p-5 rounded-2xl bg-brand-50/80 dark:bg-white/5 border border-brand-200 space-y-4 mt-4 text-xs">
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  {/* Real UPaisa QR Code */}
                  <div className="p-3.5 bg-white rounded-2xl border border-brand-200 shadow-lg flex flex-col items-center shrink-0">
                    <div className="w-48 h-48 relative rounded-xl overflow-hidden border border-slate-200 shadow-md">
                      <Image
                        src="/images/upaisa-qr.png"
                        alt="UPaisa QR Code – Muhammad Fahad – 03247506808"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                    <span className="text-[10px] font-bold text-orange-600 mt-2 uppercase tracking-wider flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-orange-500 inline-block"></span>
                      Upaisa • Raast QR
                    </span>
                  </div>

                  {/* Payment Instructions */}
                  <div className="space-y-2.5 flex-1">
                    <span className="font-serif font-bold text-sm text-foreground block">
                      Scan &amp; Pay Instantly
                    </span>
                    <p className="text-foreground/70 leading-relaxed text-[11px]">
                      Open <strong>JazzCash, Easypaisa, Upaisa, Sadapay, Nayapay, or any Pakistani Banking App</strong> (HBL, Meezan, Alfalah, UBL etc.), choose <em>Scan QR / Raast Pay</em> and scan the code above.
                    </p>
                    <div className="p-3 rounded-xl bg-white/90 dark:bg-white/10 font-mono text-[11px] space-y-1.5 border border-border/60 shadow-xs">
                      <p><strong>Account Name:</strong> Muhammad Fahad</p>
                      <p><strong>JazzCash / Upaisa:</strong> <span className="text-brand-700">0324-7506808</span></p>
                      <p><strong>Raast IBAN:</strong> PK···3998 (U-Microfinance Bank)</p>
                    </div>
                    <p className="text-[10px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 rounded-lg p-2 border border-amber-200/60">
                      ⚡ After payment, enter the Transaction ID below so we can verify and dispatch your order quickly.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-brand-200/60">
                  <label className="text-[11px] font-semibold text-foreground/80 mb-1 block">
                    Transaction ID / TRX Ref / Sender Number (Required) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. TRX-9021849102 or 0324XXXXXXX"
                    required
                    className="w-full p-2.5 rounded-xl glass-input text-xs font-mono font-semibold"
                  />
                  <p className="text-[10px] text-foreground/50 mt-1">
                    Your order will be dispatched once payment is confirmed by Muhammad Fahad.
                  </p>
                </div>
              </div>
            )}

            {paymentMethod === "JazzCash / Easypaisa" && (
              <div className="p-4 rounded-2xl bg-brand-50/70 dark:bg-white/5 border border-brand-200 space-y-2 mt-4 text-xs">
                <span className="font-semibold text-brand-800 dark:text-brand-300 block">Advance Mobile Wallet Transfer</span>
                <p className="text-foreground/70">
                  Transfer the order total directly to Muhammad Fahad:
                </p>
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-white/10 font-mono text-[11px] space-y-1 border border-border/50">
                  <p><strong>Account Name:</strong> Muhammad Fahad</p>
                  <p><strong>JazzCash / Upaisa Mobile:</strong> 0324-7506808</p>
                  <p><strong>Raast ID:</strong> 03247506808</p>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-foreground/70 mb-1 block">Sender Transaction / TRX ID *</label>
                  <input
                    type="text"
                    placeholder="e.g. 08291048219"
                    required
                    className="w-full p-2 rounded-xl glass-input text-xs font-mono"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "Bank Transfer" && (
              <div className="p-4 rounded-2xl bg-gold-50/70 dark:bg-white/5 border border-gold-200 space-y-2 mt-4 text-xs">
                <span className="font-semibold text-gold-900 dark:text-gold-300 block">Direct Raast Online Bank Transfer</span>
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-white/10 font-mono text-[11px] space-y-1 border border-border/50">
                  <p><strong>Account Title:</strong> Muhammad Fahad</p>
                  <p><strong>Bank:</strong> U-Microfinance Bank / Raast</p>
                  <p><strong>IBAN:</strong> xxxxxxxxxxxxxxxxxxx3998</p>
                  <p><strong>Account / Mobile:</strong> 0324-7506808</p>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-foreground/70 mb-1 block">Bank Reference / TRX No.</label>
                  <input
                    type="text"
                    placeholder="e.g. FT2408169910"
                    required
                    className="w-full p-2 rounded-xl glass-input text-xs font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-brand-500 via-brand-600 to-gold-500 hover:brightness-105 text-white font-medium text-base flex items-center justify-center gap-2.5 shadow-glass-lg transition-all active:scale-99"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Complete Luxury Order • {formatPrice(total)}</span>
          </button>
        </form>

        {/* Right: Order Summary Box (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white/75 dark:bg-obsidian/75 backdrop-blur-xl border border-white/80 dark:border-white/10 p-6 sm:p-8 shadow-glass-lg space-y-6 sticky top-28">
          <h3 className="font-serif text-lg font-semibold text-foreground pb-3 border-b border-border/50">
            Order Summary ({items.length} items)
          </h3>

          {/* Items summary */}
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.name}
                  className="w-12 h-12 rounded-xl object-cover border border-white/60"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground truncate">{item.product.name}</h4>
                  <p className="text-[10px] text-foreground/60">
                    Qty: {item.quantity} {item.selectedShade ? `• ${item.selectedShade.name}` : ""}
                  </p>
                </div>
                <span className="font-bold text-foreground">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Promo code */}
          <div className="pt-2 border-t border-border/50">
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs">
                <span className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  {appliedCoupon.code} Applied
                </span>
                <button onClick={removeCoupon} className="text-rose-600 hover:underline text-xs">
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code (e.g. LUMINA15)"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  className="flex-1 p-2.5 rounded-xl glass-input text-xs uppercase"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2.5 rounded-xl bg-brand-100 hover:bg-brand-200 text-brand-800 text-xs font-semibold transition-colors"
                >
                  Apply
                </button>
              </div>
            )}
            {promoMsg && !appliedCoupon && (
              <p className={`text-[11px] mt-1 ${promoMsg.success ? "text-emerald-600" : "text-rose-600"}`}>
                {promoMsg.message}
              </p>
            )}
          </div>

          {/* Calculations */}
          <div className="space-y-2 text-xs text-foreground/75 pt-3 border-t border-border/50">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-foreground">{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>VIP Discount</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span>{shipping === 0 ? <span className="text-emerald-600 font-semibold">FREE</span> : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (8%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-foreground pt-3 border-t border-border/50">
              <span>Total Due</span>
              <span className="text-lg font-serif text-brand-600">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
