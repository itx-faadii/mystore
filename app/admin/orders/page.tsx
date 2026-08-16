"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  Printer,
  X,
} from "lucide-react";
import { useAdminStore } from "@/lib/store";
import { formatPrice, formatDate } from "@/lib/utils";
import { Order, OrderStatus } from "@/lib/types";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useAdminStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs uppercase tracking-widest text-brand-600 font-bold">
          Fulfillment & Logistics
        </span>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Orders Management
        </h1>
      </div>

      {/* Toolbar */}
      <div className="p-4 rounded-3xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-foreground/40 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by order #, client name, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl glass-input text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-foreground/60 font-medium">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 rounded-xl glass-input text-xs font-semibold cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-3xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-brand-50/60 dark:bg-white/5 border-b border-border/50 text-foreground/70 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Order Ref</th>
                <th className="p-4">Date</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Invoice & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-brand-50/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-foreground">
                    {order.orderNumber}
                  </td>
                  <td className="p-4 text-foreground/60">{formatDate(order.createdAt)}</td>
                  <td className="p-4">
                    <span className="font-semibold text-foreground block">{order.customerName}</span>
                    <span className="text-[10px] text-foreground/50">{order.customerEmail}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-foreground">
                      {order.items.reduce((acc, i) => acc + i.quantity, 0)} items
                    </span>
                  </td>
                  <td className="p-4 font-bold text-foreground">
                    {formatPrice(order.totalAmount)}
                  </td>
                  <td className="p-4">
                    <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value as any)
                      }
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer border-0 outline-none ${
                        order.status === "DELIVERED"
                          ? "bg-emerald-100 text-emerald-800"
                          : order.status === "SHIPPED"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "PROCESSING"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold text-xs inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details & Invoice Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b">
              <div>
                <span className="text-xs text-foreground/50">Invoice & Details</span>
                <h3 className="font-mono text-lg font-bold text-foreground">
                  {selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-foreground/50 hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-semibold text-foreground/50 block">Customer</span>
                <p className="font-semibold text-foreground">{selectedOrder.customerName}</p>
                <p className="text-foreground/70">{selectedOrder.customerEmail}</p>
              </div>
              <div>
                <span className="font-semibold text-foreground/50 block">Delivery Address</span>
                <p className="text-foreground/80">
                  {selectedOrder.shippingAddress.street} <br />
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-2 border-t pt-4">
              <span className="text-xs font-semibold text-foreground/50 uppercase">Order Items</span>
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.product.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <span className="font-semibold text-foreground">{item.product.name}</span>
                      <p className="text-[10px] text-foreground/50">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t pt-3 space-y-1 text-xs">
              <div className="flex justify-between text-foreground/70">
                <span>Subtotal:</span>
                <span>{formatPrice(selectedOrder.subtotal)}</span>
              </div>
              {selectedOrder.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount:</span>
                  <span>-{formatPrice(selectedOrder.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-foreground/70">
                <span>Tax:</span>
                <span>{formatPrice(selectedOrder.tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-foreground pt-2 border-t">
                <span>Total:</span>
                <span className="text-brand-600">{formatPrice(selectedOrder.totalAmount)}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-foreground flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 rounded-xl bg-brand-500 text-white text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
