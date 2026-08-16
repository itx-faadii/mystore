import { GenerateProductInfoRequest, GenerateProductInfoResponse } from "./types";

export async function generateBeautyProductInfo(
  payload: GenerateProductInfoRequest
): Promise<GenerateProductInfoResponse> {
  const { name, category, keywords = "", ingredients = "", brand = "LUMINA AURA" } = payload;

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (apiKey) {
    try {
      const prompt = `You are a world-class luxury cosmetics and skincare copywriter for the prestige beauty brand "${brand}".
Given the following product details, generate high-converting, clinically-refined product marketing copy:
- Product Name: ${name}
- Category: ${category}
- Keywords/Key Focus: ${keywords || "Clean beauty, glowing skin, luxury formula, radiant complexion"}
- Provided Ingredients (if any): ${ingredients || "None"}

Respond strictly with valid JSON conforming to this schema (no markdown fences, raw JSON only):
{
  "description": "2-3 persuasive, elegant sentences highlighting sensory texture and transformative results",
  "benefits": ["Benefit 1 with clinical/botanical focus", "Benefit 2", "Benefit 3", "Benefit 4"],
  "howToUse": ["Step 1: Prep", "Step 2: Application technique", "Step 3: Pairing tip"],
  "ingredients": "A clean, INCI-style list emphasizing active botanicals and key peptides",
  "metaTitle": "${name} | Luxury ${category} - ${brand}",
  "metaDescription": "Discover the transformative ${name} by ${brand}. Formulated for radiant, youthful beauty. Free shipping on orders over $50.",
  "suggestedConcerns": ["Hydration & Moisture", "Dullness & Radiance"],
  "suggestedSkinTypes": ["All Skin Types", "Sensitive", "Dry"]
}`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20240620",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const contentText = data.content?.[0]?.text;
        if (contentText) {
          const parsed = JSON.parse(contentText.replace(/```json|```/g, "").trim());
          return parsed as GenerateProductInfoResponse;
        }
      }
    } catch (e) {
      console.warn("Claude API call failed or timed out, falling back to intelligent beauty generator", e);
    }
  }

  // Built-in Luxury Copy Generation Engine (Instant, zero-cost, zero latency)
  return fallbackBeautyGenerator(name, category, keywords, ingredients, brand);
}

function fallbackBeautyGenerator(
  name: string,
  category: string,
  keywords: string,
  ingredients: string,
  brand: string
): GenerateProductInfoResponse {
  const cat = category.toLowerCase();
  
  if (cat.includes("skin") || cat.includes("serum") || cat.includes("cream") || cat.includes("cleanser") || cat.includes("toner")) {
    return {
      description: `Elevate your daily ritual with ${name}, a silky, ultra-nourishing formula engineered to restore skin's natural luminescence and youthful elasticity. Infused with concentrated botanical bio-actives and multi-weight hydration molecules, it absorbs instantly into the dermal barrier to impart an ethereal, glass-skin dewiness without weight or residue.`,
      benefits: [
        "Deeply replenishes cellular moisture reservoir for up to 72 hours of continuous hydration",
        "Visible reduction in fine dehydration lines, redness, and uneven skin texture within 14 days",
        "Fortifies the delicate moisture barrier against urban micro-pollutants and oxidative stress",
        "Non-comedogenic, dermatologist-tested, and formulated at the optimal pH for sensitive skin"
      ],
      howToUse: [
        "Step 1: Dispense 3–4 drops or a dime-sized amount onto freshly cleansed, damp skin morning and evening.",
        "Step 2: Gently press into face, neck, and décolletage using upward lymphatic motions until fully absorbed.",
        "Step 3: Follow with your favorite LUMINA AURA moisturizer or facial oil to seal in active nutrients."
      ],
      ingredients: ingredients || "Aqua/Water/Eau, Niacinamide (5%), Triple-Weight Sodium Hyaluronate, Rosa Damascena Flower Extract, Camellia Sinensis (Green Tea) Leaf Extract, Centella Asiatica (Cica) Extract, Squalane (Olive-Derived), Ceramide NP, Acetyl Hexapeptide-8, Glycerin, Tocopherol (Vitamin E), Phenoxyethanol, Ethylhexylglycerin.",
      metaTitle: `${name} | Clean Prestige Skincare - ${brand}`,
      metaDescription: `Shop ${name} by ${brand}. A high-performance luxury skincare formula delivering radiant, deeply hydrated, and smoothed skin. Clean, vegan, cruelty-free.`,
      suggestedConcerns: ["Hydration & Moisture", "Dullness & Radiance", "Anti-Aging & Fine Lines"],
      suggestedSkinTypes: ["All Skin Types", "Dry", "Sensitive", "Combination"]
    };
  }

  if (cat.includes("makeup") || cat.includes("lip") || cat.includes("foundation") || cat.includes("blush") || cat.includes("mascara")) {
    return {
      description: `Experience weightless, high-pigment perfection with ${name}. Formulated with light-diffusing optical pearls and soothing plant oils, this couture formula melts seamlessly into the skin to deliver customizable coverage and a luminous, soft-focus velvet finish that stays vibrant all day.`,
      benefits: [
        "Featherlight, breathable texture that delivers seamless, streak-free buildable coverage",
        "Infused with skin-loving nourishing botanicals that hydrate while enhancing natural radiance",
        "Crease-resistant, transfer-proof wear designed to look fresh and luminous for up to 16 hours",
        "Formulated without talc, synthetic parabens, or heavy waxes for a clean, effortless feel"
      ],
      howToUse: [
        "Step 1: Shake or swirl gently to activate the luminous pigment suspension.",
        "Step 2: Apply a small amount to the focal points using fingertips, a damp beauty sponge, or a dense buffing brush.",
        "Step 3: Blend outward in gentle sweeping motions; layer as desired for customized intensity."
      ],
      ingredients: ingredients || "Dimethicone, Caprylic/Capric Triglyceride, Simmondsia Chinensis (Jojoba) Seed Oil, Butyrospermum Parkii (Shea) Butter, Silica, Mica (CI 77019), Titanium Dioxide (CI 77891), Iron Oxides (CI 77491, CI 77492, CI 77499), Tocopheryl Acetate, Limnanthes Alba (Meadowfoam) Seed Oil, Punica Granatum (Pomegranate) Sterols.",
      metaTitle: `${name} | Couture Luxury Makeup - ${brand}`,
      metaDescription: `Discover the stunning ${name} by ${brand}. High-pigment, skin-nourishing luxury makeup for an effortless, radiant finish. Shop now.`,
      suggestedConcerns: ["Dullness & Radiance", "Pores & Texture"],
      suggestedSkinTypes: ["All Skin Types", "Normal", "Combination", "Oily"]
    };
  }

  // Generic Luxury Beauty / Fragrance / Haircare
  return {
    description: `A masterclass in sensory indulgence, ${name} combines rare botanical essences with clinical precision to elevate your daily beauty ceremony. Formulated to nourish, protect, and leave an indelible impression of timeless elegance and vitality.`,
    benefits: [
      "Crafted with sustainable, wild-harvested botanical extracts and clean bio-peptides",
      "Instant sensory transformation with a delicate, captivating luxury fragrance profile",
      "Shields hair, skin, and senses from environmental stressors while delivering deep rejuvenation",
      "100% Cruelty-Free, Vegan-Certified, and packaged in recyclable frosted glass"
    ],
    howToUse: [
      "Step 1: Dispense a measured amount into palms to release the warm botanical aromatics.",
      "Step 2: Apply evenly to targeted areas, massaging gently to activate micro-circulation.",
      "Step 3: Breathe deeply and allow the clean, radiant botanicals to absorb thoroughly."
    ],
    ingredients: ingredients || "Helianthus Annuus (Sunflower) Seed Oil, Argania Spinosa (Argan) Kernel Oil, Camellia Japonica Seed Oil, Fragrance/Parfum (Natural Botanical Blend), Tocopherol, Squalane, Rosmarinus Officinalis (Rosemary) Leaf Extract.",
    metaTitle: `${name} | Prestige Beauty - ${brand}`,
    metaDescription: `Experience ${name} by ${brand}. Clean, botanical luxury crafted for effortless beauty and undeniable radiance.`,
    suggestedConcerns: ["Hydration & Moisture", "Dullness & Radiance"],
    suggestedSkinTypes: ["All Skin Types"]
  };
}
