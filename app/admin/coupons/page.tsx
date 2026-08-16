"use client";

import React, { useState } from "react";
import {
  Tag,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Percent,
  DollarSign,
} from "lucide-react";
import { useAdminStore } from "@/lib/store";
import { Coupon } from "@/lib/types";

export default function AdminCouponsPage() {
  const { coupons, addCoupon, toggleCoupon, deleteCoupon } = useAdminStore();

  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"PERCENTAGE" | "FIXED">("PERCENTAGE");
  const [value, setValue] = useState<number>(15);
  const [minOrderValue, setMinOrderValue] = useState<number>(50);

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const newCoupon: Coupon = {
      code: code.trim().toUpperCase(),
      description,
      type,
      value: Number(value),
      minOrderValue: Number(minOrderValue),
      isActive: true,
    };

    addCoupon(newCoupon);
    setCode("");
    setDescription("");
    setValue(15);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <span className="text-xs uppercase tracking-widest text-brand-600 font-bold">
          Promotions & Incentives
        </span>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Discounts & Coupon Engine
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Create Coupon Form (5 cols) */}
        <form
          onSubmit={handleCreateCoupon}
          className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass space-y-4 h-fit"
        >
          <h2 className="font-serif text-lg font-bold text-foreground flex items-center gap-2">
            <Tag className="w-4 h-4 text-brand-600" />
            <span>Create Promo Code</span>
          </h2>

          <div>
            <label className="text-xs font-semibold text-foreground/70 mb-1 block">
              Coupon Code *
            </label>
            <input
              type="text"
              placeholder="e.g. VIP25"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="w-full p-2.5 rounded-xl glass-input text-xs font-mono uppercase font-bold"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground/70 mb-1 block">
              Offer Description
            </label>
            <input
              type="text"
              placeholder="e.g. 25% Off Summer Beauty Set"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 rounded-xl glass-input text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1 block">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full p-2.5 rounded-xl glass-input text-xs"
              >
                <option value="PERCENTAGE">Percentage (%)</option>
                <option value="FIXED">Fixed Amount ($)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1 block">
                Value ({type === "PERCENTAGE" ? "%" : "$"})
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                required
                className="w-full p-2.5 rounded-xl glass-input text-xs font-bold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground/70 mb-1 block">
              Min. Order Value ($)
            </label>
            <input
              type="number"
              value={minOrderValue}
              onChange={(e) => setMinOrderValue(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl glass-input text-xs"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Coupon Code</span>
          </button>
        </form>

        {/* Right: Active Coupons List (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass p-6 sm:p-8 space-y-4">
          <h2 className="font-serif text-lg font-bold text-foreground pb-3 border-b border-border/50">
            Active Store Promo Codes
          </h2>

          <div className="space-y-3">
            {coupons.map((coupon) => (
              <div
                key={coupon.code}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-border/40 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-200/60">
                      {coupon.code}
                    </span>
                    <span className="font-bold text-foreground">
                      {coupon.type === "PERCENTAGE" ? `${coupon.value}% OFF` : `$${coupon.value} OFF`}
                    </span>
                  </div>
                  <p className="text-foreground/70">{coupon.description || "General promotional discount"}</p>
                  {coupon.minOrderValue ? (
                    <p className="text-[10px] text-foreground/50">Min. cart value: ${coupon.minOrderValue}</p>
                  ) : null}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleCoupon(coupon.code)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                      coupon.isActive ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {coupon.isActive ? "Active" : "Disabled"}
                  </button>

                  <button
                    onClick={() => deleteCoupon(coupon.code)}
                    className="p-1.5 text-foreground/40 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
