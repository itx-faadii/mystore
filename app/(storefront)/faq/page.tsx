import React from "react";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      q: "Are all LUMINA AURA products 100% clean and cruelty-free?",
      a: "Yes. Every single formulation is certified by Leaping Bunny, completely vegan, and crafted without sulfates, parabens, phthalates, synthetic dyes, or microplastics.",
    },
    {
      q: "How does complimentary express delivery work?",
      a: "We offer complimentary express delivery on all orders over $70. Orders are prepared in temperature-controlled packaging within 24 business hours.",
    },
    {
      q: "Can I use the live concierge chat to get custom skin advice?",
      a: "Yes! Tap the floating beauty bubble at the bottom right to speak with a skincare specialist and receive personalized routine pairings and exclusive private discount codes.",
    },
    {
      q: "What is your 30-day Pure Radiance guarantee?",
      a: "If a formula does not leave your skin feeling noticeably softer, hydrated, and radiant within 30 days, we will gladly arrange a full refund or exchange.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Client Guidance</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white/70 dark:bg-obsidian/70 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass space-y-2"
          >
            <h3 className="font-serif text-base font-bold text-foreground">
              {faq.q}
            </h3>
            <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
