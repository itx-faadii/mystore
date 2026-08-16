"use client";

import React from "react";
import { Filter, RotateCcw, Sparkles } from "lucide-react";
import { SkinConcern, SkinType } from "@/lib/types";

interface FacetedFiltersProps {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedSkinType: string;
  onSkinTypeChange: (st: string) => void;
  selectedConcern: string;
  onConcernChange: (concern: string) => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  onReset: () => void;
}

const CATEGORIES = ["All", "Skincare", "Makeup", "Fragrance", "Haircare"];

const SKIN_TYPES: (SkinType | "All")[] = [
  "All",
  "All Skin Types",
  "Dry",
  "Sensitive",
  "Oily",
  "Combination",
];

const SKIN_CONCERNS: (SkinConcern | "All")[] = [
  "All",
  "Hydration & Moisture",
  "Anti-Aging & Fine Lines",
  "Dark Spots & Hyperpigmentation",
  "Acne & Blemishes",
  "Pores & Texture",
  "Dullness & Radiance",
];

export const FacetedFilters: React.FC<FacetedFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
  selectedSkinType,
  onSkinTypeChange,
  selectedConcern,
  onConcernChange,
  maxPrice,
  onMaxPriceChange,
  sortBy,
  onSortByChange,
  onReset,
}) => {
  return (
    <aside className="w-full lg:w-64 rounded-3xl bg-white/70 dark:bg-obsidian/70 backdrop-blur-xl border border-white/80 dark:border-white/10 p-6 shadow-sm space-y-6 h-fit sticky top-28">
      {/* Filter Header */}
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-600" />
          <h3 className="font-serif font-semibold text-base text-foreground">
            Refine Catalog
          </h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-brand-600 hover:text-brand-700 flex items-center gap-1 font-medium"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="w-full p-2.5 rounded-xl glass-input text-xs font-medium text-foreground bg-white/60 dark:bg-white/5 cursor-pointer"
        >
          <option value="featured">Curated & Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated & Verified</option>
          <option value="newest">Newest Arrivals</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
          Category
        </label>
        <div className="flex flex-col gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`text-left text-xs px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                selectedCategory === cat
                  ? "bg-brand-500 text-white font-semibold shadow-sm"
                  : "text-foreground/75 hover:bg-brand-50/70 dark:hover:bg-white/5"
              }`}
            >
              <span>{cat}</span>
              {selectedCategory === cat && <Sparkles className="w-3 h-3" />}
            </button>
          ))}
        </div>
      </div>

      {/* Max Price Slider */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium text-foreground/70">
          <span>Max Price</span>
          <span className="font-bold text-brand-600">${maxPrice}</span>
        </div>
        <input
          type="range"
          min="20"
          max="150"
          step="5"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-full accent-brand-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-foreground/40">
          <span>$20</span>
          <span>$150+</span>
        </div>
      </div>

      {/* Skin Concern Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
          Target Concern
        </label>
        <div className="flex flex-wrap gap-1.5">
          {SKIN_CONCERNS.map((concern) => (
            <button
              key={concern}
              onClick={() => onConcernChange(concern)}
              className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                selectedConcern === concern
                  ? "bg-brand-100 dark:bg-white/10 text-brand-800 dark:text-brand-300 border-brand-400 font-semibold shadow-xs"
                  : "bg-white/50 dark:bg-white/5 text-foreground/70 border-border/50 hover:bg-white"
              }`}
            >
              {concern}
            </button>
          ))}
        </div>
      </div>

      {/* Skin Type Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
          Skin Type
        </label>
        <div className="flex flex-wrap gap-1.5">
          {SKIN_TYPES.map((st) => (
            <button
              key={st}
              onClick={() => onSkinTypeChange(st)}
              className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                selectedSkinType === st
                  ? "bg-gold-100 text-gold-800 border-gold-400 font-semibold"
                  : "bg-white/50 dark:bg-white/5 text-foreground/70 border-border/50 hover:bg-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
