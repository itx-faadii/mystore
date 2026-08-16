"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Send,
  Sparkles,
  Tag,
  CheckCircle2,
  User,
  ShoppingBag,
} from "lucide-react";
import { useAdminStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function AdminChatInboxPage() {
  const {
    chatSessions,
    sendAdminChatMessage,
    resolveChatSession,
  } = useAdminStore();

  const [selectedSessionId, setSelectedSessionId] = useState<string>(
    chatSessions[0]?.id || ""
  );
  const [adminReply, setAdminReply] = useState("");

  const activeSession =
    chatSessions.find((s) => s.id === selectedSessionId) || chatSessions[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReply.trim() || !activeSession) return;

    sendAdminChatMessage(activeSession.id, adminReply);
    setAdminReply("");
  };

  const handleSendSpecialDiscount = (code: string, percent: number) => {
    if (!activeSession) return;
    sendAdminChatMessage(
      activeSession.id,
      `Here is an exclusive ${percent}% VIP discount code for your order today:`,
      code,
      percent
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase tracking-widest text-brand-600 font-bold">
          Customer Support & Sales Concierge
        </span>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Live Chat Inbox
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[650px]">
        {/* Left: Conversations List (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass p-4 flex flex-col justify-between overflow-hidden">
          <div className="overflow-y-auto space-y-2">
            <h3 className="font-serif text-sm font-bold text-foreground px-2 py-1">
              Active Conversations ({chatSessions.length})
            </h3>

            {chatSessions.map((sess) => (
              <button
                key={sess.id}
                onClick={() => setSelectedSessionId(sess.id)}
                className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-start justify-between gap-2 ${
                  sess.id === activeSession?.id
                    ? "bg-brand-500 text-white shadow-sm"
                    : "hover:bg-brand-50/60 dark:hover:bg-white/5 text-foreground"
                }`}
              >
                <div className="min-w-0">
                  <span className="font-bold text-xs block truncate">
                    {sess.customerName}
                  </span>
                  <p
                    className={`text-[11px] truncate mt-0.5 ${
                      sess.id === activeSession?.id
                        ? "text-white/80"
                        : "text-foreground/60"
                    }`}
                  >
                    {sess.lastMessage || "No messages yet"}
                  </p>
                  {sess.cartContext && (
                    <span
                      className={`text-[10px] mt-1 inline-block ${
                        sess.id === activeSession?.id
                          ? "text-gold-200"
                          : "text-brand-600"
                      }`}
                    >
                      Cart: {sess.cartContext.itemCount} items ({formatPrice(sess.cartContext.total)})
                    </span>
                  )}
                </div>

                <span
                  className={`text-[9px] shrink-0 ${
                    sess.id === activeSession?.id ? "text-white/60" : "text-foreground/40"
                  }`}
                >
                  {sess.lastTimestamp}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Active Chat Stream & Discount Inserter (8 cols) */}
        {activeSession ? (
          <div className="lg:col-span-8 rounded-3xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass flex flex-col justify-between overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-border/50 flex items-center justify-between bg-white/40 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-white/10 text-brand-700 dark:text-brand-300 flex items-center justify-center font-bold text-sm">
                  {activeSession.customerName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-foreground">
                    {activeSession.customerName}
                  </h3>
                  <span className="text-[10px] text-emerald-600 font-medium">
                    Browsing Storefront
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSendSpecialDiscount("LUMINA15", 15)}
                  className="px-3 py-1.5 rounded-xl bg-gold-100 hover:bg-gold-200 text-gold-900 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Tag className="w-3 h-3" />
                  <span>Send 15% Code</span>
                </button>
                <button
                  onClick={() => handleSendSpecialDiscount("GLOW20", 20)}
                  className="px-3 py-1.5 rounded-xl bg-brand-100 hover:bg-brand-200 text-brand-900 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Send 20% VIP</span>
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-3 bg-slate-50/40 dark:bg-black/20">
              {activeSession.messages.map((msg) => {
                const isAdmin = msg.sender === "admin";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      isAdmin ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isAdmin
                          ? "bg-brand-500 text-white rounded-tr-xs shadow-sm"
                          : "bg-white dark:bg-white/10 text-foreground border border-border/50 rounded-tl-xs shadow-sm"
                      }`}
                    >
                      <p>{msg.message}</p>
                      {msg.couponCode && (
                        <div className="mt-2 p-2 rounded-xl bg-white/20 text-white font-mono font-bold text-xs flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5" />
                          <span>Code: {msg.couponCode} ({msg.discountVal}% OFF)</span>
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] text-foreground/40 mt-1 px-1">
                      {msg.sender === "admin" ? "Concierge" : activeSession.customerName} • {msg.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Reply Input */}
            <form
              onSubmit={handleSendReply}
              className="p-4 bg-white/60 dark:bg-obsidian/60 border-t border-border/50 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Type response to client..."
                value={adminReply}
                onChange={(e) => setAdminReply(e.target.value)}
                className="flex-1 p-3 rounded-xl glass-input text-xs"
              />
              <button
                type="submit"
                disabled={!adminReply.trim()}
                className="px-5 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="lg:col-span-8 flex items-center justify-center p-12 text-center text-foreground/50">
            No conversation selected
          </div>
        )}
      </div>
    </div>
  );
}
