"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Eye,
  Tag,
  ShieldAlert,
} from "lucide-react";
import { useAdminStore } from "@/lib/store";
import { Product, ShadeVariant } from "@/lib/types";
import { slugify, generateSKU, formatPrice } from "@/lib/utils";

const SAMPLE_COSMETICS_IMAGES = [
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1608248597359-00f738b5fa2f?auto=format&fit=crop&w=800&q=80",
];

export default function AddProductPage() {
  const router = useRouter();
  const { addProduct } = useAdminStore();

  // Basic Info
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Skincare");
  const [brand, setBrand] = useState("FAADII");
  const [price, setPrice] = useState<number>(58.0);
  const [compareAtPrice, setCompareAtPrice] = useState<number>(72.0);
  const [stock, setStock] = useState<number>(50);
  const [sku, setSku] = useState<string>("");

  // AI Generated / Editable Content
  const [keywords, setKeywords] = useState("");
  const [description, setDescription] = useState("");
  const [benefits, setBenefits] = useState<string[]>([
    "Infuses 72-hour deep cellular moisture reservoir",
    "Strengthens natural skin barrier and soothes redness",
    "Visible glass-skin radiance and refined pore texture",
    "100% Clean, non-comedogenic, and vegan certified",
  ]);
  const [howToUse, setHowToUse] = useState<string[]>([
    "Step 1: Dispense 3–4 drops onto cleansed, damp face and neck.",
    "Step 2: Press gently in upward lifting motions until fully absorbed.",
    "Step 3: Follow with LUMINA AURA barrier cream to seal active botanicals.",
  ]);
  const [ingredients, setIngredients] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  // Visuals & Variants
  const [selectedImage, setSelectedImage] = useState(SAMPLE_COSMETICS_IMAGES[0]);
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [shades, setShades] = useState<ShadeVariant[]>([]);
  const [newShadeName, setNewShadeName] = useState("");
  const [newShadeHex, setNewShadeHex] = useState("#e89f9e");

  // AI loading state
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiSuccessMsg, setAiSuccessMsg] = useState(false);

  const handleAutoGenerateAI = async () => {
    if (!name.trim()) {
      alert("Please enter a product name first before generating AI details.");
      return;
    }

    setIsGeneratingAI(true);
    setAiSuccessMsg(false);

    try {
      const res = await fetch("/api/admin/generate-product-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category,
          keywords,
          ingredients,
          brand,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        const data = json.data;
        setDescription(data.description);
        if (data.benefits?.length) setBenefits(data.benefits);
        if (data.howToUse?.length) setHowToUse(data.howToUse);
        if (data.ingredients) setIngredients(data.ingredients);
        if (data.metaTitle) setMetaTitle(data.metaTitle);
        if (data.metaDescription) setMetaDescription(data.metaDescription);
        setAiSuccessMsg(true);
      }
    } catch (e) {
      console.error(e);
      alert("Error generating product info. Please try again.");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleAddShade = () => {
    if (!newShadeName.trim()) return;
    const shade: ShadeVariant = {
      id: `shade-${Date.now()}`,
      name: newShadeName.trim(),
      hexCode: newShadeHex,
      inStock: true,
    };
    setShades([...shades, shade]);
    setNewShadeName("");
  };

  const handleRemoveShade = (id: string) => {
    setShades(shades.filter((s) => s.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalSku = sku.trim() || generateSKU(brand, name);
    const finalSlug = slugify(name);

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name,
      slug: finalSlug,
      brand,
      category: category as any,
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
      sku: finalSku,
      stock: Number(stock),
      rating: 5.0,
      reviewCount: 1,
      isFeatured: true,
      isNewArrival: true,
      description:
        description ||
        `Silky, ultra-hydrating ${name} crafted with botanical bio-actives for radiant glass skin.`,
      benefits,
      howToUse,
      ingredients:
        ingredients ||
        "Aqua, Niacinamide, Sodium Hyaluronate, Rosa Damascena Hydrosol, Squalane, Tocopherol.",
      skinTypes: ["All Skin Types", "Sensitive"],
      concerns: ["Hydration & Moisture", "Dullness & Radiance"],
      metaTitle: metaTitle || `${name} | Luxury ${category} - ${brand}`,
      metaDescription: metaDescription || `Shop ${name} by ${brand}. High-performance luxury skincare.`,
      images: [selectedImage],
      thumbnail: selectedImage,
      shades: shades.length > 0 ? shades : undefined,
      sizes: ["50ml / 1.7 fl oz"],
      createdAt: new Date().toISOString(),
    };

    addProduct(newProduct);
    router.push("/admin/products");
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-foreground/70 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
        <span className="text-xs text-foreground/50">Auto-Generates Descriptions & SEO</span>
      </div>

      <div>
        <span className="text-xs uppercase tracking-widest text-brand-600 font-bold">
          Product Creator
        </span>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Create New Beauty Formulation
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Fields (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Basic Info & AI Trigger Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass space-y-5">
            <h2 className="font-serif text-lg font-bold text-foreground flex items-center justify-between">
              <span>1. Product Core Details</span>
              <span className="text-xs text-brand-600 font-normal">Manual Input</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-foreground/70 mb-1 block">
                  Product Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Celestial Peptide Barrier Essence"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl glass-input text-xs font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground/70 mb-1 block">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 rounded-xl glass-input text-xs font-medium cursor-pointer"
                >
                  <option value="Skincare">Skincare</option>
                  <option value="Makeup">Makeup</option>
                  <option value="Fragrance">Fragrance</option>
                  <option value="Haircare">Haircare</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground/70 mb-1 block">
                  Keywords / Target Benefits (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rose hydrosol, barrier repair, glass skin"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full p-3 rounded-xl glass-input text-xs"
                />
              </div>
            </div>

            {/* AI Auto-Generate Banner Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-50 via-gold-50/60 to-brand-50/40 dark:from-white/10 dark:to-white/5 border border-brand-200/80 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif text-sm font-bold text-brand-900 dark:text-brand-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-600" />
                    <span>AI Product Info Generator</span>
                  </h3>
                  <p className="text-xs text-brand-700/80 dark:text-foreground/70">
                    Instantly creates descriptions, 4 clinical benefits, usage steps, ingredients, and SEO meta.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAutoGenerateAI}
                  disabled={isGeneratingAI}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-gold-500 hover:brightness-105 disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all shrink-0"
                >
                  {isGeneratingAI ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                  <span>{isGeneratingAI ? "Generating Copy..." : "Auto-Generate with AI"}</span>
                </button>
              </div>

              {aiSuccessMsg && (
                <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>AI copy generated successfully! You can review or edit below.</span>
                </p>
              )}
            </div>
          </div>

          {/* 2. AI Generated / Editable Marketing Text */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass space-y-5">
            <h2 className="font-serif text-lg font-bold text-foreground flex items-center justify-between">
              <span>2. Product Narrative & Benefits</span>
              <span className="text-xs text-emerald-600 font-medium">Fully Editable</span>
            </h2>

            {/* Description */}
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1 block">
                Product Description (2–3 Persuasive Sentences)
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Click 'Auto-Generate with AI' above or type manual product story..."
                className="w-full p-3 rounded-xl glass-input text-xs leading-relaxed"
              />
            </div>

            {/* Benefits list */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground/70 block">
                Key Benefits (Bullet Points)
              </label>
              {benefits.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={b}
                    onChange={(e) => {
                      const updated = [...benefits];
                      updated[idx] = e.target.value;
                      setBenefits(updated);
                    }}
                    className="flex-1 p-2.5 rounded-xl glass-input text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setBenefits(benefits.filter((_, i) => i !== idx))}
                    className="p-2 text-foreground/40 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setBenefits([...benefits, "New clinical botanical benefit"])}
                className="text-xs font-semibold text-brand-600 hover:underline flex items-center gap-1 mt-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Benefit
              </button>
            </div>

            {/* How to use */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground/70 block">
                How to Use (Step-by-Step Ceremony)
              </label>
              {howToUse.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => {
                      const updated = [...howToUse];
                      updated[idx] = e.target.value;
                      setHowToUse(updated);
                    }}
                    className="flex-1 p-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
              ))}
            </div>

            {/* Ingredients */}
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1 block">
                Clean Botanical Ingredients (INCI List)
              </label>
              <textarea
                rows={3}
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="INCI ingredients list..."
                className="w-full p-3 rounded-xl glass-input text-xs font-mono"
              />
            </div>
          </div>

          {/* 3. SEO Meta Tags */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass space-y-4">
            <h2 className="font-serif text-lg font-bold text-foreground">
              3. SEO Optimization
            </h2>
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1 block">Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Product | Clean Luxury - LUMINA AURA"
                className="w-full p-3 rounded-xl glass-input text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1 block">Meta Description</label>
              <textarea
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Discover the transformative formula..."
                className="w-full p-3 rounded-xl glass-input text-xs"
              />
            </div>
          </div>
        </div>

        {/* Right: Media, Pricing, Shades & Preview (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Pricing & Stock Card */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass space-y-4">
            <h3 className="font-serif text-base font-bold text-foreground">
              Pricing & Stock
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground/70 mb-1 block">Price ($) *</label>
                <input
                  type="number"
                  step="0.5"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
                  className="w-full p-2.5 rounded-xl glass-input text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground/70 mb-1 block">Compare ($)</label>
                <input
                  type="number"
                  step="0.5"
                  value={compareAtPrice}
                  onChange={(e) => setCompareAtPrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground/70 mb-1 block">Stock Quantity *</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  required
                  className="w-full p-2.5 rounded-xl glass-input text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-brand-700 dark:text-brand-300 mb-1 block">
                  Product Code (Admin Only)
                </label>
                <input
                  type="text"
                  placeholder="e.g. LUM-SKIN-001"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full p-2.5 rounded-xl glass-input text-xs font-mono font-bold uppercase"
                />
              </div>
            </div>
          </div>

          {/* Product Image Selector */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass space-y-4">
            <h3 className="font-serif text-base font-bold text-foreground">
              Select Product Photo
            </h3>

            <div className="aspect-square rounded-2xl overflow-hidden bg-brand-50 border border-border">
              <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {SAMPLE_COSMETICS_IMAGES.slice(0, 4).map((img, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === img ? "border-brand-500 scale-105" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div>
              <label className="text-[11px] font-medium text-foreground/70 mb-1 block">Or Paste Custom Image URL</label>
              <input
                type="url"
                placeholder="https://..."
                value={customImageUrl}
                onChange={(e) => {
                  setCustomImageUrl(e.target.value);
                  if (e.target.value.startsWith("http")) {
                    setSelectedImage(e.target.value);
                  }
                }}
                className="w-full p-2.5 rounded-xl glass-input text-xs"
              />
            </div>
          </div>

          {/* Shades / Variants */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-obsidian/80 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass space-y-4">
            <h3 className="font-serif text-base font-bold text-foreground">
              Shade Options (Optional)
            </h3>

            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={newShadeHex}
                onChange={(e) => setNewShadeHex(e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer border-0"
              />
              <input
                type="text"
                placeholder="Shade Name (e.g. Rose Opal)"
                value={newShadeName}
                onChange={(e) => setNewShadeName(e.target.value)}
                className="flex-1 p-2 rounded-xl glass-input text-xs"
              />
              <button
                type="button"
                onClick={handleAddShade}
                className="px-3 py-2 bg-brand-100 text-brand-800 rounded-xl text-xs font-semibold"
              >
                Add
              </button>
            </div>

            {shades.length > 0 && (
              <div className="space-y-2 pt-2">
                {shades.map((s) => (
                  <div key={s.id} className="flex items-center justify-between p-2 rounded-xl bg-white/50 border text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: s.hexCode }} />
                      <span className="font-medium text-foreground">{s.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveShade(s.id)}
                      className="text-foreground/40 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-brand-600 to-gold-500 hover:brightness-105 text-white font-semibold text-sm shadow-glass-lg transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Publish Formulation to Storefront</span>
          </button>
        </div>
      </form>
    </div>
  );
}
