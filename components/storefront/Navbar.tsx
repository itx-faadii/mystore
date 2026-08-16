"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  LayoutDashboard,
  User,
  ArrowRight,
} from "lucide-react";
import { useCartStore, useWishlistStore, useAdminStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { openCart, getItemCount } = useCartStore();
  const wishlistItems = useWishlistStore((state) => state.items);
  const products = useAdminStore((state) => state.products);

  const cartCount = getItemCount();
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop All", href: "/products" },
    { name: "Skincare", href: "/products?category=Skincare" },
    { name: "Makeup", href: "/products?category=Makeup" },
    { name: "Fragrance", href: "/products?category=Fragrance" },
    { name: "Haircare", href: "/products?category=Haircare" },
  ];

  const filteredSearchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.concerns.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-gold-600 text-white text-xs py-2 px-4 text-center font-medium tracking-widest uppercase shadow-sm flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>Complimentary Luxe Duo & Free Shipping on Orders $70+</span>
        <span className="hidden sm:inline opacity-80">| Use Code: <strong>LUMINA15</strong> for 15% OFF</span>
      </div>

      {/* Main Glass Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-obsidian/85 backdrop-blur-xl border-b border-white/60 dark:border-white/10 shadow-glass"
            : "bg-white/40 dark:bg-obsidian/40 backdrop-blur-md border-b border-white/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Toggle */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-foreground hover:bg-brand-50/60 transition-colors"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-400 to-gold-400 p-[1.5px] shadow-sm">
                <div className="w-full h-full rounded-full bg-white dark:bg-obsidian flex items-center justify-center">
                  <span className="font-serif font-bold text-xs text-brand-600 dark:text-brand-300">F</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-wider text-foreground group-hover:text-brand-600 transition-colors">
                  FAADII
                </span>
                <span className="text-[9px] tracking-[0.25em] text-foreground/60 uppercase font-sans -mt-1">
                  Haute Skincare & Cosmetics
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium tracking-wide transition-colors relative py-1 hover:text-brand-600 ${
                      isActive ? "text-brand-600 font-semibold" : "text-foreground/80"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-400 to-gold-400 rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-full text-foreground/80 hover:text-brand-600 hover:bg-white/60 dark:hover:bg-white/10 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                className="relative p-2.5 rounded-full text-foreground/80 hover:text-brand-600 hover:bg-white/60 dark:hover:bg-white/10 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-brand-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={openCart}
                className="relative p-2.5 rounded-full bg-brand-50/80 dark:bg-white/5 text-brand-700 dark:text-brand-300 hover:bg-brand-100/80 transition-all border border-brand-200/50"
                aria-label="Open Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-brand-500 to-gold-500 text-white rounded-full text-[11px] font-bold flex items-center justify-center shadow-md"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* User Account Link */}
              <Link
                href="/account"
                className="p-2.5 rounded-full text-foreground/80 hover:text-brand-600 hover:bg-white/60 dark:hover:bg-white/10 transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white/95 dark:bg-obsidian/95 border-b border-border/50 backdrop-blur-xl px-6 py-6 space-y-4"
            >
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium text-foreground hover:text-brand-600 py-1 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border/50 flex flex-col gap-3">
                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-sm text-foreground/80 hover:text-brand-600"
                  >
                    <User className="w-4 h-4" />
                    <span>My Account & Orders</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Live Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              className="relative w-full max-w-2xl rounded-3xl bg-white/90 dark:bg-obsidian/90 backdrop-blur-2xl border border-white/80 dark:border-white/10 shadow-2xl p-6 z-10"
            >
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <Search className="w-6 h-6 text-brand-600" />
                <input
                  type="text"
                  placeholder="Search botanical serums, lip oils, cleansers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent text-lg text-foreground placeholder:text-foreground/40 focus:outline-none"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded-full text-foreground/50 hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Results */}
              <div className="mt-4 max-h-96 overflow-y-auto space-y-3">
                {searchQuery.trim() === "" ? (
                  <div className="py-8 text-center text-foreground/50 text-sm">
                    <p>Start typing to discover luxury formulas...</p>
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                      {["Dew Serum", "Lip Oil", "Barrier Crème", "Rosewater", "Glow"].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="px-3 py-1 rounded-full text-xs bg-brand-50 text-brand-700 hover:bg-brand-100 transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : filteredSearchResults.length > 0 ? (
                  filteredSearchResults.map((prod) => (
                    <Link
                      key={prod.id}
                      href={`/products/${prod.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-4 p-3 rounded-2xl hover:bg-brand-50/70 dark:hover:bg-white/5 transition-colors group"
                    >
                      <img
                        src={prod.thumbnail}
                        alt={prod.name}
                        className="w-14 h-14 rounded-xl object-cover border border-white/60 shadow-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs uppercase tracking-wider text-brand-600 font-semibold">
                          {prod.category}
                        </span>
                        <h4 className="text-sm font-serif font-medium text-foreground group-hover:text-brand-600 transition-colors truncate">
                          {prod.name}
                        </h4>
                        <span className="text-xs font-semibold text-foreground/80">
                          {formatPrice(prod.price)}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:text-brand-600 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))
                ) : (
                  <div className="py-8 text-center text-foreground/50 text-sm">
                    No beauty products found for &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
