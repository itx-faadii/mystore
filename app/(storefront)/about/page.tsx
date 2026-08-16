import React from "react";
import Link from "next/link";
import { Sparkles, Leaf, Award, ShieldCheck, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The LUMINA Story</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground leading-tight">
          Where Clean Science Meets <br />
          <span className="gold-gradient-text italic">Botanical Luxury</span>
        </h1>
        <p className="text-sm text-foreground/75 leading-relaxed">
          Born between Parisian dermatological research and wild botanical harvests, LUMINA AURA was founded with a singular conviction: skincare should be pure, sensorially exquisite, and clinically potent.
        </p>
      </div>

      {/* Story section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="rounded-3xl overflow-hidden shadow-glass border border-white/80">
          <img
            src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
            alt="Botanical Formulations"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-foreground/80 leading-relaxed">
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Crafted for Uncompromised Glass Radiance
          </h2>
          <p>
            We eliminate the false choice between organic botanicals and clinical efficacy. By bio-fermenting pure Bulgarian Damask rose hydrosol, olive-derived squalane, and multi-weight hyaluronic peptides, we create weights that penetrate the lipid layer without surface tackiness.
          </p>
          <p>
            Every jar and flacon is packaged in heavyweight, endlessly recyclable frosted glass with gold-leaf accents, ensuring our formulas remain protected from photo-oxidation while gracing your vanity.
          </p>
        </div>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white/70 dark:bg-obsidian/70 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass space-y-3">
          <div className="p-3 rounded-2xl bg-brand-100 text-brand-700 w-fit">
            <Leaf className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-foreground">100% Clean Bio-Actives</h3>
          <p className="text-xs text-foreground/70 leading-relaxed">
            Formulated without sulfates, parabens, phthalates, synthetic fragrance, or mineral oil.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white/70 dark:bg-obsidian/70 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass space-y-3">
          <div className="p-3 rounded-2xl bg-gold-100 text-gold-700 w-fit">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-foreground">Cruelty-Free Always</h3>
          <p className="text-xs text-foreground/70 leading-relaxed">
            Certified by Leaping Bunny. We never test on animals at any stage of formula development.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white/70 dark:bg-obsidian/70 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-glass space-y-3">
          <div className="p-3 rounded-2xl bg-lavender-100 text-lavender-700 w-fit">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-foreground">Dermatologist Verified</h3>
          <p className="text-xs text-foreground/70 leading-relaxed">
            Optimal pH balancing tested specifically on delicate, sensitive, and reactive skin barriers.
          </p>
        </div>
      </div>
    </div>
  );
}
