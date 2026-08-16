"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Tag,
  Check,
  Bot,
  UserCheck,
  ShoppingBag,
} from "lucide-react";
import { useAdminStore, useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [hasNewBadge, setHasNewBadge] = useState(true);

  const { chatSessions, sendCustomerChatMessage, sendAdminChatMessage } = useAdminStore();
  const { applyCoupon, getSubtotal, openCart } = useCartStore();

  const activeSession = chatSessions[0];
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeSession) return;

    const userText = inputText;
    setInputText("");

    sendCustomerChatMessage(activeSession.id, userText);

    // Dynamic intelligent advisor simulation
    setTimeout(() => {
      const lower = userText.toLowerCase();
      if (lower.includes("discount") || lower.includes("coupon") || lower.includes("code") || lower.includes("offer") || lower.includes("deal")) {
        sendAdminChatMessage(
          activeSession.id,
          "Here is an exclusive 15% VIP Beauty Concierge coupon code just for you! Click below to apply it straight to your bag.",
          "LUMINA15",
          15
        );
      } else if (lower.includes("dry") || lower.includes("hydrate") || lower.includes("serum")) {
        sendAdminChatMessage(
          activeSession.id,
          "For maximum deep hydration, we recommend layering our Luminescence Hydro-Dew Serum right before the Velvet Cloud Barrier Crème.",
          "LUMINA15",
          15
        );
      } else {
        sendAdminChatMessage(
          activeSession.id,
          "Thank you for reaching out to LUMINA AURA Beauty Concierge! Our skincare specialist is online and happy to assist with any routine advice or bespoke recommendations."
        );
      }
    }, 1200);
  };

  const handleApplyCouponFromChat = (code: string) => {
    const res = applyCoupon(code);
    if (res.success) {
      setAppliedCouponCode(code);
      setTimeout(() => {
        openCart();
      }, 600);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setHasNewBadge(false);
        }}
        className="relative p-4 rounded-full bg-gradient-to-tr from-brand-500 via-brand-600 to-gold-500 text-white shadow-floating hover:shadow-glass-glow flex items-center justify-center transition-all duration-300"
        aria-label="Open Live Beauty Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            {hasNewBadge && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-400 rounded-full border-2 border-white animate-pulse" />
            )}
          </>
        )}
      </motion.button>

      {/* Floating Glass Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="absolute bottom-16 right-0 w-[360px] sm:w-[400px] h-[520px] rounded-3xl bg-white/90 dark:bg-obsidian/95 backdrop-blur-2xl border border-white/80 dark:border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 bg-gradient-to-r from-brand-500 to-brand-600 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Sparkles className="w-5 h-5 text-gold-200" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-brand-600" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold">FAADII Concierge</h3>
                  <p className="text-[10px] text-white/80">Skin Specialist • Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Special Promo Bar */}
            <div className="bg-brand-50/90 dark:bg-white/5 px-4 py-2 border-b border-border/40 text-[11px] text-foreground/80 flex items-center justify-between">
              <span className="flex items-center gap-1 font-medium text-brand-700 dark:text-brand-300">
                <Tag className="w-3 h-3" /> Ask concierge for private discounts
              </span>
              <span className="text-[10px] text-foreground/50">Instant Reply</span>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {activeSession?.messages.map((msg) => {
                const isAdmin = msg.sender === "admin" || msg.sender === "bot";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      isAdmin ? "items-start" : "items-end"
                    }`}
                  >
                    <div
                      className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
                        isAdmin
                          ? "bg-white/90 dark:bg-white/10 text-foreground border border-white/60 dark:border-white/10 shadow-sm rounded-tl-xs"
                          : "bg-brand-500 text-white rounded-tr-xs shadow-sm"
                      }`}
                    >
                      <p>{msg.message}</p>

                      {/* Attached Discount Code Injection */}
                      {msg.couponCode && (
                        <div className="mt-2.5 p-2.5 rounded-xl bg-gold-50 dark:bg-gold-950/40 border border-gold-300/60 text-gold-900 dark:text-gold-200 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs flex items-center gap-1 text-gold-800 dark:text-gold-300">
                              <Tag className="w-3.5 h-3.5" />
                              {msg.couponCode}
                            </span>
                            <span className="text-[10px] bg-gold-200 text-gold-900 px-1.5 py-0.5 rounded-md font-semibold">
                              {msg.discountVal}% OFF
                            </span>
                          </div>

                          <button
                            onClick={() => handleApplyCouponFromChat(msg.couponCode!)}
                            className="w-full mt-1 py-1.5 px-3 rounded-lg bg-gold-500 hover:bg-gold-600 text-white text-[11px] font-semibold flex items-center justify-center gap-1 shadow-xs transition-colors"
                          >
                            {appliedCouponCode === msg.couponCode ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Applied to Bag!</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-3 h-3" />
                                <span>1-Click Apply to Bag</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] text-foreground/40 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-white/70 dark:bg-obsidian/70 border-t border-border/50 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about skin routine or discounts..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl glass-input text-xs text-foreground placeholder:text-foreground/40"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white transition-colors shadow-sm"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
