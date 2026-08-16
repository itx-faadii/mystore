"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Package,
  PlusCircle,
  Search,
  Trash2,
  Edit,
  Eye,
  Archive,
  ArrowUpDown,
  Sparkles,
  Check,
} from "lucide-react";
import { useAdminStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  const {
    products,
    deleteProduct,
    toggleProductArchive,
    bulkDeleteProducts,
    bulkUpdatePricePercent,
  } = useAdminStore();

  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [percentModalOpen, setPercentModalOpen] = useState(false);
  const [percentVal, setPercentVal] = useState(10);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((p) => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedIds.length} products?`)) {
      bulkDeleteProducts(selectedIds);
      setSelectedIds([]);
    }
  };

  const handleBulkPrice = () => {
    bulkUpdatePricePercent(selectedIds, percentVal);
    setPercentModalOpen(false);
    setSelectedIds([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-brand-600 font-bold">
            Catalog Administration
          </span>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Product Management
          </h1>
        </div>

        <Link
          href="/admin/products/new"
          className="px-5 py-2.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-medium text-xs flex items-center gap-2 shadow-md transition-colors w-fit"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Formula</span>
        </Link>
      </div>

      {/* Search and Bulk Actions Toolbar */}
      <div className="p-4 rounded-3xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-foreground/40 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by name, SKU, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl glass-input text-xs"
          />
        </div>

        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-brand-600 mr-2">
              {selectedIds.length} selected
            </span>
            <button
              onClick={() => setPercentModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-gold-100 hover:bg-gold-200 text-gold-800 text-xs font-semibold transition-colors"
            >
              Adjust Price %
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-3xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-brand-50/60 dark:bg-white/5 border-b border-border/50 text-foreground/70 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filtered.length && filtered.length > 0}
                    onChange={handleSelectAll}
                    className="rounded accent-brand-500 cursor-pointer"
                  />
                </th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Admin Code</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-brand-50/30 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(prod.id)}
                      onChange={() => toggleSelect(prod.id)}
                      className="rounded accent-brand-500 cursor-pointer"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.thumbnail}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover border border-white/60 shrink-0"
                      />
                      <div>
                        <Link
                          href={`/products/${prod.slug}`}
                          target="_blank"
                          className="font-semibold text-foreground hover:text-brand-600 transition-colors"
                        >
                          {prod.name}
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-mono font-bold text-xs bg-gold-100 text-gold-900 border border-gold-300/70 px-2 py-0.5 rounded-md">
                      {prod.sku}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-foreground/80">{prod.category}</td>
                  <td className="p-4 font-bold text-foreground">{formatPrice(prod.price)}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        prod.stock > 30
                          ? "bg-emerald-100 text-emerald-800"
                          : prod.stock > 0
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {prod.stock} units
                    </span>
                  </td>
                  <td className="p-4 font-medium text-foreground">
                    ★ {prod.rating} ({prod.reviewCount})
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleProductArchive(prod.id)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase transition-colors ${
                        prod.isArchived
                          ? "bg-slate-200 text-slate-700"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {prod.isArchived ? "Archived" : "Active"}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/products/${prod.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-foreground/60 hover:text-brand-600"
                        title="View on Storefront"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="p-1.5 rounded-lg text-foreground/60 hover:text-rose-600"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for adjusting price percentage */}
      {percentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="font-serif text-lg font-bold">Bulk Price Adjustment</h3>
            <p className="text-xs text-foreground/60">
              Apply a percentage change to the {selectedIds.length} selected formulas.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={percentVal}
                onChange={(e) => setPercentVal(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border text-sm font-bold"
              />
              <span className="text-sm font-bold">%</span>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setPercentModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-foreground/60"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkPrice}
                className="px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-semibold"
              >
                Update Prices
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
