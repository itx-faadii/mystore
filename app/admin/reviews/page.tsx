"use client";

import React, { useState } from "react";
import { Star, Check, X, Trash2, ShieldCheck } from "lucide-react";
import { INITIAL_REVIEWS } from "@/lib/mock-data";
import { RatingStars } from "@/components/ui/RatingStars";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);

  const handleToggleApprove = (id: string) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, isApproved: !r.isApproved } : r))
    );
  };

  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase tracking-widest text-brand-600 font-bold">
          Reputation & Social Proof
        </span>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Customer Reviews Moderation
        </h1>
      </div>

      <div className="rounded-3xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-brand-50/60 dark:bg-white/5 border-b border-border/50 text-foreground/70 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Headline & Content</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {reviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-brand-50/30 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-foreground block">{rev.authorName}</span>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified Buyer
                    </span>
                  </td>
                  <td className="p-4">
                    <RatingStars rating={rev.rating} size="sm" />
                  </td>
                  <td className="p-4 max-w-xs">
                    <h4 className="font-semibold text-foreground">{rev.title}</h4>
                    <p className="text-foreground/70 text-[11px] line-clamp-2 mt-0.5">{rev.content}</p>
                  </td>
                  <td className="p-4 text-foreground/60">{rev.date}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        rev.isApproved
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {rev.isApproved ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleApprove(rev.id)}
                        className={`p-1.5 rounded-lg text-xs font-semibold ${
                          rev.isApproved
                            ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                        }`}
                        title={rev.isApproved ? "Unapprove" : "Approve"}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(rev.id)}
                        className="p-1.5 rounded-lg text-foreground/40 hover:text-rose-600"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
