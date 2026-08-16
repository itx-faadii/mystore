"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAdminStore } from "@/lib/store";
import { formatPrice, formatDate } from "@/lib/utils";
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  MapPin,
  Heart,
  User,
  Shield,
  ArrowRight,
} from "lucide-react";

export default function AccountPage() {
  const orders = useAdminStore((state) => state.orders);
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "profile">("orders");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-white/70 via-brand-50/60 to-gold-50/60 dark:from-white/10 dark:to-white/5 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-400 to-gold-400 p-[2px]">
            <div className="w-full h-full rounded-full bg-white dark:bg-obsidian flex items-center justify-center font-serif text-xl font-bold text-brand-600">
              A
            </div>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-600 font-bold">
              VIP Beauty Member
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Audrey Hepburn-Miller
            </h1>
            <p className="text-xs text-foreground/60">audrey.m@example.com</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border/50 pb-4">
        {[
          { id: "orders", label: "My Orders & Tracking", icon: Package },
          { id: "addresses", label: "Saved Addresses", icon: MapPin },
          { id: "profile", label: "Skin Profile", icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? "bg-brand-500 text-white shadow-md"
                  : "text-foreground/70 hover:bg-white/60"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab: Orders */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="p-12 text-center bg-white/50 rounded-3xl border border-white/60">
              <p className="text-sm text-foreground/60">You have not placed any beauty orders yet.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-obsidian/70 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/50 gap-2">
                  <div>
                    <span className="text-xs text-foreground/50">Order Reference</span>
                    <h3 className="font-mono font-bold text-base text-foreground">{order.orderNumber}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        order.status === "DELIVERED"
                          ? "bg-emerald-100 text-emerald-800"
                          : order.status === "SHIPPED"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="text-xs text-foreground/60">{formatDate(order.createdAt)}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/50 dark:bg-white/5 border border-border/40">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-foreground truncate">{item.product.name}</h4>
                        <p className="text-[10px] text-foreground/60">Qty: {item.quantity} • {formatPrice(item.product.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer summary */}
                <div className="flex items-center justify-between pt-4 border-t border-border/40 text-xs">
                  <span className="text-foreground/70">
                    Paid via {order.paymentMethod} • Shipping to {order.shippingAddress.city}, {order.shippingAddress.state}
                  </span>
                  <div className="text-right">
                    <span className="text-foreground/50 mr-2">Total Paid:</span>
                    <span className="font-serif font-bold text-base text-brand-600">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Addresses */}
      {activeTab === "addresses" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white/70 dark:bg-obsidian/70 backdrop-blur-xl border border-brand-300 shadow-glass space-y-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-100 text-brand-700 uppercase">
              Default Delivery Address
            </span>
            <h4 className="font-semibold text-foreground text-sm pt-2">Audrey Hepburn-Miller</h4>
            <p className="text-xs text-foreground/70 leading-relaxed">
              742 Evergreen Terrace <br />
              Beverly Hills, CA 90210 <br />
              United States
            </p>
          </div>
        </div>
      )}

      {/* Tab: Skin Profile */}
      {activeTab === "profile" && (
        <div className="p-8 rounded-3xl bg-white/70 dark:bg-obsidian/70 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass space-y-4 max-w-xl">
          <h3 className="font-serif text-lg font-bold text-foreground">Bespoke Skin Diagnosis</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-brand-50/60 flex justify-between">
              <span className="text-foreground/70">Skin Type:</span>
              <span className="font-semibold text-foreground">Sensitive & Combination</span>
            </div>
            <div className="p-3 rounded-xl bg-gold-50/60 flex justify-between">
              <span className="text-foreground/70">Primary Concerns:</span>
              <span className="font-semibold text-foreground">Hydration & Radiance</span>
            </div>
            <div className="p-3 rounded-xl bg-lavender-50/60 flex justify-between">
              <span className="text-foreground/70">Preferred Texture:</span>
              <span className="font-semibold text-foreground">Lightweight Dewy Serums</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
