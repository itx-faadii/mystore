import React from "react";
import Link from "next/link";
import { Sparkles, Shield, Leaf, Heart, RefreshCw, Send } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white/40 dark:bg-obsidian/60 border-t border-border/40 backdrop-blur-xl mt-20 pt-16 pb-12">
      {/* Brand Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10 shadow-glass">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-brand-100 text-brand-700 shadow-sm">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">100% Clean & Vegan</h4>
              <p className="text-xs text-foreground/60">Sustainably harvested botanicals</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-gold-100 text-gold-700 shadow-sm">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Leaping Bunny Certified</h4>
              <p className="text-xs text-foreground/60">Strictly cruelty-free formulas</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-lavender-100 text-lavender-700 shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Dermatologist Tested</h4>
              <p className="text-xs text-foreground/60">Optimal pH for sensitive skin</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-700 shadow-sm">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Eco-Luxury Packaging</h4>
              <p className="text-xs text-foreground/60">100% recyclable frosted glass</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-400 to-gold-400 p-[1px]">
              <div className="w-full h-full rounded-full bg-white dark:bg-obsidian flex items-center justify-center">
                <span className="font-serif font-bold text-xs text-brand-600">F</span>
              </div>
            </div>
            <span className="font-serif text-2xl font-bold tracking-wider text-foreground">
              FAADII
            </span>
          </div>
          <p className="text-sm text-foreground/70 leading-relaxed max-w-sm">
            Bridging rare botanical bio-actives with clean clinical science. Formulated to awaken your skin&apos;s natural radiance.
          </p>

          {/* Newsletter Input */}
          <div className="pt-2">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
              Join the VIP Beauty Circle (15% Off First Order)
            </h5>
            <div className="flex gap-2 max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs text-foreground placeholder:text-foreground/40 focus:outline-none"
              />
              <button
                className="px-4 py-2.5 rounded-xl bg-brand-500 text-white hover:bg-brand-600 transition-colors flex items-center justify-center shadow-md text-xs font-medium"
                aria-label="Subscribe"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Column 1: Shop */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
            Collections
          </h4>
          <ul className="space-y-2.5 text-xs text-foreground/70">
            <li><Link href="/products?category=Skincare" className="hover:text-brand-600 transition-colors">Haute Skincare</Link></li>
            <li><Link href="/products?category=Makeup" className="hover:text-brand-600 transition-colors">Luminous Makeup</Link></li>
            <li><Link href="/products?category=Fragrance" className="hover:text-brand-600 transition-colors">Artisanal Fragrance</Link></li>
            <li><Link href="/products?category=Haircare" className="hover:text-brand-600 transition-colors">Botanical Haircare</Link></li>
            <li><Link href="/products?bestSeller=true" className="hover:text-brand-600 transition-colors">Best Sellers</Link></li>
          </ul>
        </div>

        {/* Column 2: Assistance */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
            Client Care
          </h4>
          <ul className="space-y-2.5 text-xs text-foreground/70">
            <li><Link href="/account" className="hover:text-brand-600 transition-colors">Track Order</Link></li>
            <li><Link href="/faq" className="hover:text-brand-600 transition-colors">Shipping & Returns</Link></li>
            <li><Link href="/contact" className="hover:text-brand-600 transition-colors">Skin Consultation</Link></li>
            <li><Link href="/about" className="hover:text-brand-600 transition-colors">Our Story & Ingredients</Link></li>
            <li><Link href="/faq" className="hover:text-brand-600 transition-colors">FAQ</Link></li>
          </ul>
        </div>

        {/* Column 3: Legal */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
            Governance
          </h4>
          <ul className="space-y-2.5 text-xs text-foreground/70">
            <li><Link href="/privacy" className="hover:text-brand-600 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-brand-600 transition-colors">Terms of Service</Link></li>
            <li><Link href="/sustainability" className="hover:text-brand-600 transition-colors">Eco-Pledge</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between text-xs text-foreground/50 gap-4">
        <p>&copy; {new Date().getFullYear()} LUMINA AURA Inc. All rights reserved. Crafted with clean beauty passion.</p>
        <div className="flex items-center gap-6">
          <span>USD ($)</span>
          <span>Free Standard Worldwide Delivery</span>
        </div>
      </div>
    </footer>
  );
};
