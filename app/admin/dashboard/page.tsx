"use client";

import React from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Package,
  PlusCircle,
  Tag,
  ArrowRight,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { useAdminStore } from "@/lib/store";
import { formatPrice, formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const { products, orders, coupons, chatSessions } = useAdminStore();

  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const lowStockProducts = products.filter((p) => p.stock < 30);

  return (
    <div className="space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-brand-600 font-bold">
            Executive Overview
          </span>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Boutique Performance & Analytics
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-brand-500 to-gold-500 hover:brightness-105 text-white font-medium text-xs flex items-center gap-2 shadow-md transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Add Product with AI</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-3xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground/60">Gross Revenue</span>
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-2xl font-bold text-foreground">
            {formatPrice(totalRevenue)}
          </h3>
          <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% from last month
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground/60">Total Orders</span>
            <div className="p-2 rounded-xl bg-brand-100 text-brand-700">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-2xl font-bold text-foreground">
            {totalOrders}
          </h3>
          <p className="text-[11px] text-brand-600 font-medium">100% fulfillment rate</p>
        </div>

        <div className="p-6 rounded-3xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground/60">Average Order Value</span>
            <div className="p-2 rounded-xl bg-gold-100 text-gold-700">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-2xl font-bold text-foreground">
            {formatPrice(avgOrderValue)}
          </h3>
          <p className="text-[11px] text-gold-600 font-medium">Above industry benchmark</p>
        </div>

        <div className="p-6 rounded-3xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground/60">Active Formulas</span>
            <div className="p-2 rounded-xl bg-lavender-100 text-lavender-700">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-2xl font-bold text-foreground">
            {products.length}
          </h3>
          <p className="text-[11px] text-foreground/50">Clean beauty catalog</p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-xl border border-white/80 dark:border-white/10 p-6 shadow-glass space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border/50">
            <h3 className="font-serif text-lg font-bold text-foreground">
              Recent Customer Orders
            </h3>
            <Link
              href="/admin/orders"
              className="text-xs text-brand-600 font-semibold hover:underline"
            >
              View All Orders
            </Link>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 4).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-border/40 text-xs"
              >
                <div className="space-y-0.5">
                  <span className="font-mono font-bold text-foreground">{order.orderNumber}</span>
                  <p className="text-foreground/70">{order.customerName}</p>
                </div>

                <div className="text-right">
                  <span className="font-bold text-foreground block">{formatPrice(order.totalAmount)}</span>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      order.status === "DELIVERED"
                        ? "bg-emerald-100 text-emerald-800"
                        : order.status === "SHIPPED"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts & Inventory (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-xl border border-white/80 dark:border-white/10 p-6 shadow-glass space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border/50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="font-serif text-lg font-bold text-foreground">
                Inventory Alerts
              </h3>
            </div>
            <span className="text-xs font-semibold text-amber-600">
              {lowStockProducts.length} low in stock
            </span>
          </div>

          <div className="space-y-3">
            {lowStockProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img src={p.thumbnail} alt="" className="w-9 h-9 rounded-lg object-cover" />
                  <span className="font-semibold text-foreground truncate">{p.name}</span>
                </div>
                <span className="px-2 py-1 rounded-md bg-amber-200/80 text-amber-900 font-bold shrink-0">
                  {p.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
