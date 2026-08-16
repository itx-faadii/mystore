"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Leaf,
  Droplets,
  Award,
  Star,
  Heart,
  Instagram,
  CheckCircle2,
} from "lucide-react";
import { useAdminStore, useCartStore } from "@/lib/store";
import { ProductCard } from "@/components/storefront/ProductCard";
import { QuickViewModal } from "@/components/storefront/QuickViewModal";
import { Product } from "@/lib/types";
import { INITIAL_REVIEWS } from "@/lib/mock-data";

export default function HomePage() {
  const products = useAdminStore((state) => state.products);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const bestSellers = products.filter((p) => p.isBestSeller || p.isFeatured).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival || p.category === "Makeup").slice(0, 4);

  const categories = [
    {
      name: "Haute Skincare",
      slug: "Skincare",
      desc: "Bio-peptide serums & whipped barrier creams",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Couture Makeup",
      slug: "Makeup",
      desc: "Mirror lip oils & candlelit illuminators",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Artisanal Fragrance",
      slug: "Fragrance",
      desc: "High-concentration 28% extrait de parfums",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Botanical Haircare",
      slug: "Haircare",
      desc: "Rosemary & Camellia scalp shine elixirs",
      image: "https://images.unsplash.com/photo-1608248597359-00f738b5fa2f?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="space-y-24 pb-16 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center pt-8 pb-16">
        {/* Glowing blurred background orbs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-brand-300/30 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-gold-300/25 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-white/10 border border-brand-200/60 dark:border-white/15 backdrop-blur-md shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-700 dark:text-brand-300">
                  Clean Haute Beauty & Clinical Radiance
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                Awaken Your Skin&apos;s <br />
                <span className="gold-gradient-text italic">Natural Luminescence</span>
              </h1>

              <p className="text-base sm:text-lg text-foreground/75 leading-relaxed max-w-xl">
                Rare organic botanicals blended with pharmaceutical bio-actives. Formulated to deeply restore, plump, and impart an unearthly glass skin glow.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/products"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-brand-600 to-gold-500 hover:brightness-105 text-white font-medium text-sm sm:text-base flex items-center gap-2.5 shadow-glass-lg transition-all active:scale-98"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/products?bestSeller=true"
                  className="px-8 py-4 rounded-2xl bg-white/60 dark:bg-white/10 hover:bg-white/90 text-foreground font-medium text-sm sm:text-base border border-white/80 dark:border-white/15 backdrop-blur-md transition-all shadow-sm"
                >
                  <span>View Best Sellers</span>
                </Link>
              </div>

              {/* Trust Micro-Row */}
              <div className="pt-6 border-t border-border/40 grid grid-cols-3 gap-4 max-w-lg">
                <div className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Clean & Vegan</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cruelty-Free</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dermatologist Tested</span>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Visual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              {/* Glass Frosted Showcase Card */}
              <div className="relative rounded-3xl p-4 sm:p-6 bg-white/65 dark:bg-obsidian/70 backdrop-blur-2xl border border-white/80 dark:border-white/10 shadow-glass-lg">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-brand-50 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80"
                    alt="LUMINA AURA Hero Elixir"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-300">
                      Iconic Formula #1
                    </span>
                    <h3 className="font-serif text-2xl font-bold">
                      Hydro-Dew Serum
                    </h3>
                    <p className="text-xs text-white/80 mt-1">
                      Multi-weight Hyaluronic Acid & Bulgarian Rose Hydrosol
                    </p>
                  </div>
                </div>

                {/* Floating Glass Metric Badge */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -bottom-6 -left-6 rounded-2xl p-4 bg-white/90 dark:bg-obsidian/90 backdrop-blur-xl border border-white/90 dark:border-white/10 shadow-glass-lg flex items-center gap-3"
                >
                  <div className="p-2.5 rounded-xl bg-gold-100 text-gold-700">
                    <Star className="w-5 h-5 fill-gold-400 text-gold-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-foreground">4.9 / 5.0</span>
                      <span className="text-[10px] text-foreground/50">(2,400+ Reviews)</span>
                    </div>
                    <p className="text-[11px] text-foreground/70">
                      &ldquo;Holy grail for glass skin!&rdquo;
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY HIGHLIGHT TILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest text-brand-600 font-bold">
            Curated Formulations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            Explore by Ritual
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div key={cat.slug}>
              <Link
                href={`/products?category=${cat.slug}`}
                className="group relative block aspect-[3/4] rounded-3xl overflow-hidden bg-brand-50 border border-white/70 shadow-glass hover:shadow-glass-lg transition-all duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-6 flex flex-col justify-end text-white transition-opacity">
                  <h3 className="font-serif text-xl font-bold group-hover:text-gold-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-white/80 mt-1 line-clamp-2">
                    {cat.desc}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-gold-300 group-hover:translate-x-1 transition-transform">
                    <span>Shop Ritual</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BEST SELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-600 font-bold">
              Most Coveted
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-1">
              Iconic Best Sellers
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold uppercase tracking-wider text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>View All Formulas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 4. THE CLEAN SCIENCE DIFFERENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-white/75 via-brand-50/50 to-gold-50/60 dark:from-white/10 dark:to-white/5 backdrop-blur-2xl border border-white/90 dark:border-white/10 shadow-glass-lg grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
              The LUMINA Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              Clinically Formulated. <br />
              <span className="gold-gradient-text italic">Botanically Powered.</span>
            </h2>
            <p className="text-sm text-foreground/75 leading-relaxed">
              Every drop is created without parabens, sulfates, synthetic dyes, or micro-plastics. We combine multi-weight botanical bio-actives with clean peptides formulated at the precise pH for sensitive, glowing skin.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-border/50">
                <Droplets className="w-5 h-5 text-brand-600 mb-2" />
                <h4 className="font-serif text-sm font-semibold text-foreground">72-Hour Hydration</h4>
                <p className="text-xs text-foreground/60 mt-1">Multi-depth dermal cellular reservoir</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-border/50">
                <Award className="w-5 h-5 text-gold-600 mb-2" />
                <h4 className="font-serif text-sm font-semibold text-foreground">98% Active Results</h4>
                <p className="text-xs text-foreground/60 mt-1">Visible glass skin radiance in 14 days</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
                alt="Clean Skincare Lab"
                className="rounded-2xl object-cover h-64 w-full shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
                alt="Botanical Ingredients"
                className="rounded-2xl object-cover h-64 w-full mt-6 shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED REVIEWS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest text-brand-600 font-bold">
            Real Transformations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            Loved by Beauty Connoisseurs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-white/70 dark:bg-obsidian/70 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-gold-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400" />
                  ))}
                </div>
                <h4 className="font-serif text-base font-semibold text-foreground">
                  &ldquo;{rev.title}&rdquo;
                </h4>
                <p className="text-xs text-foreground/75 leading-relaxed">
                  {rev.content}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-foreground">{rev.authorName}</span>
                  <p className="text-[10px] text-emerald-600 font-medium">Verified Customer</p>
                </div>
                <span className="text-[10px] text-foreground/40">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. INSTAGRAM BEAUTY GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 space-y-1">
          <span className="text-xs uppercase tracking-widest text-brand-600 font-bold">
            Join the Community
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground flex items-center justify-center gap-2">
            <Instagram className="w-6 h-6 text-brand-600" />
            <span>#LuminaGlowRitual</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
          ].map((url, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl overflow-hidden group relative border border-white/60 shadow-sm"
            >
              <img
                src={url}
                alt="Instagram Beauty Post"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Instagram className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
