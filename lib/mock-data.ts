import { Product, Coupon, Order, ChatSession } from "./types";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Luminescence Hydro-Dew Serum",
    slug: "luminescence-hydro-dew-serum",
    brand: "LUMINA AURA",
    category: "Skincare",
    subCategory: "Serums & Essences",
    price: 68.0,
    compareAtPrice: 85.0,
    sku: "LUM-SER-8821",
    stock: 45,
    rating: 4.9,
    reviewCount: 142,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    description: "An ultra-hydrating, multi-molecular hyaluronic acid elixir engineered with Bulgarian Rose water, 5% Niacinamide, and botanical squalane. Plumps skin cells from within to create an ethereal, lit-from-within glass skin radiance with zero sticky residue.",
    benefits: [
      "Infuses 72-hour deep cellular moisture with 4 molecular weights of Hyaluronic Acid",
      "Noticeably minimizes pores and evens tone with 5% refined Niacinamide",
      "Soothes redness and strengthens delicate skin moisture barrier with organic Rose Hydrosol",
      "Dermatologist-tested, non-comedogenic, clean and 100% cruelty-free"
    ],
    howToUse: [
      "Dispense 3–4 drops onto freshly cleansed, slightly damp skin every morning and evening.",
      "Gently press and pat into face, neck, and décolletage using upward gliding motions.",
      "Follow with LUMINA AURA Velvet Cloud Crème to lock in active botanicals."
    ],
    ingredients: "Rosa Damascena Flower Water, Aqua/Water/Eau, Niacinamide (5%), Sodium Hyaluronate (Multi-Weight), Glycerin, Squalane, Centella Asiatica Extract, Camellia Sinensis (Green Tea) Leaf Extract, Acetyl Hexapeptide-8, Panthenol (Vitamin B5), Tocopherol, Ethylhexylglycerin.",
    skinTypes: ["All Skin Types", "Dry", "Sensitive", "Combination"],
    concerns: ["Hydration & Moisture", "Dullness & Radiance", "Pores & Texture"],
    metaTitle: "Luminescence Hydro-Dew Serum | Clean Luxury Hydration - LUMINA AURA",
    metaDescription: "Transform dull skin into radiant glass dewiness with the Luminescence Hydro-Dew Serum. Enriched with Niacinamide, Rose Hydrosol, and Hyaluronic Acid.",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1608248597359-00f738b5fa2f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1000&q=80"
    ],
    thumbnail: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    sizes: ["30ml / 1.0 fl oz", "50ml / 1.7 fl oz"],
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "prod-2",
    name: "Velvet Cloud Peptide Barrier Crème",
    slug: "velvet-cloud-peptide-barrier-creme",
    brand: "LUMINA AURA",
    category: "Skincare",
    subCategory: "Moisturizers",
    price: 76.0,
    compareAtPrice: 92.0,
    sku: "LUM-CRM-4102",
    stock: 28,
    rating: 5.0,
    reviewCount: 98,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    description: "A rich, whipped cloud cream infused with 5 bio-identical ceramides, signal peptides, and soothing blue tansy. Melts instantly into stressed skin to repair the lipid barrier, calm irritation, and seal in long-lasting velvety moisture.",
    benefits: [
      "Clinically proven to fortify the lipid barrier against pollution and environmental dryness",
      "Delivers intense, weightless nourishment without clogging pores or causing breakouts",
      "Signature whipped cloud texture that cushions skin in velvety comfort",
      "Infused with rare Blue Tansy to reduce visible redness and soothe sensitive skin"
    ],
    howToUse: [
      "Warm a dime-sized amount between fingertips to activate the peptide emulsion.",
      "Gently smooth over face and neck morning and night after serums.",
      "Can be used as an overnight recovery sleep mask for ultra-dry climates."
    ],
    ingredients: "Aqua, Caprylic/Capric Triglyceride, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Tanacetum Annuum (Blue Tansy) Flower Oil, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7, Butyrospermum Parkii Butter, Squalane, Allantoin.",
    skinTypes: ["All Skin Types", "Dry", "Sensitive"],
    concerns: ["Hydration & Moisture", "Anti-Aging & Fine Lines"],
    metaTitle: "Velvet Cloud Peptide Barrier Crème | Repair & Hydrate - LUMINA AURA",
    metaDescription: "Replenish your skin barrier with 5 Ceramides and Peptides in a whipped cloud texture. Cruelty-free luxury moisturizer.",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80"
    ],
    thumbnail: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    sizes: ["50ml / 1.7 fl oz"],
    createdAt: "2024-02-01T12:00:00Z"
  },
  {
    id: "prod-3",
    name: "Aura Silk Luminous Tinted Lip Oil",
    slug: "aura-silk-luminous-tinted-lip-oil",
    brand: "LUMINA AURA",
    category: "Makeup",
    subCategory: "Lips",
    price: 34.0,
    compareAtPrice: 42.0,
    sku: "LUM-LIP-9934",
    stock: 84,
    rating: 4.8,
    reviewCount: 215,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    description: "A decadent, non-sticky couture lip oil combining the mirror-shine of a gloss with the deep conditioning of an organic botanical lip mask. Infused with cold-pressed Raspberry Seed Oil and Maxi-Lip peptides for pillowy, juicy lips.",
    benefits: [
      "High-shine reflective glass finish with zero stickiness or tackiness",
      "Visibly plumps and cushions lips with restorative bio-peptides",
      "Nourishing infusion of Vitamin E, Jojoba, and Raspberry seed oils",
      "Adaptive pH tint creates a bespoke, flattering flush of healthy color"
    ],
    howToUse: [
      "Glide the custom plush doe-foot applicator across bare lips for a luminous natural tint.",
      "Layer over your favorite lip liner or lipstick for high-voltage glass dimension."
    ],
    ingredients: "Polybutene, Hydrogenated Polyisobutene, Rubus Idaeus (Raspberry) Seed Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Ethylhexyl Palmitate, Tribehenin, Sorbitan Isostearate, Palmitoyl Tripeptide-1, Tocopheryl Acetate, CI 77891, CI 77491, CI 45410.",
    skinTypes: ["All Skin Types"],
    concerns: ["Hydration & Moisture", "Dullness & Radiance"],
    metaTitle: "Aura Silk Luminous Tinted Lip Oil | Mirror Shine & Plumping",
    metaDescription: "Hydrating luxury lip oil enriched with raspberry seed oil and peptides for non-sticky, mirror-glass shine.",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=1000&q=80"
    ],
    thumbnail: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
    shades: [
      { id: "sh-1", name: "Rose Quartz Sheer", hexCode: "#e89f9e", inStock: true },
      { id: "sh-2", name: "Champagne Glaze", hexCode: "#dfb87c", inStock: true },
      { id: "sh-3", name: "Spiced Dahlia", hexCode: "#9e3d48", inStock: true },
      { id: "sh-4", name: "Berry Nectar", hexCode: "#7d2946", inStock: true }
    ],
    createdAt: "2024-02-10T14:00:00Z"
  },
  {
    id: "prod-4",
    name: "Golden Hour Celestial Glow Illuminator",
    slug: "golden-hour-celestial-glow-illuminator",
    brand: "LUMINA AURA",
    category: "Makeup",
    subCategory: "Cheeks & Face",
    price: 48.0,
    compareAtPrice: 58.0,
    sku: "LUM-GLW-2091",
    stock: 52,
    rating: 4.9,
    reviewCount: 78,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    description: "A liquid-pearl highlighter serum packed with micro-fine champagne minerals and hydrating chamomile hydrosol. Imparts an ethereal, candlelight radiance that looks like pure glowing skin, never glittery or heavy.",
    benefits: [
      "Micro-milled multidimensional mineral pearls that fuse seamlessly into skin",
      "Universal warmth that flatters all undertones without looking ash or metallic",
      "Can be mixed with moisturizer or foundation for an all-over luminous filter",
      "Infused with chamomile and green tea to soothe complexion"
    ],
    howToUse: [
      "Dab 1–2 drops onto high points of face (cheekbones, brow bone, cupid's bow) and tap with fingertips.",
      "Or mix a drop into your foundation or SPF for an effortlessly radiant complexion."
    ],
    ingredients: "Aqua, Isododecane, Mica, Caprylic/Capric Triglyceride, Chamomilla Recutita Flower Extract, Camellia Sinensis Leaf Extract, Titanium Dioxide, Iron Oxides, Tocopherol.",
    skinTypes: ["All Skin Types", "Normal", "Dry", "Combination"],
    concerns: ["Dullness & Radiance"],
    metaTitle: "Golden Hour Celestial Glow Illuminator | Liquid Pearl Highlighter",
    metaDescription: "Get the iconic candlelit glow with Golden Hour Celestial Glow Illuminator by LUMINA AURA. Weightless liquid pearl highlight.",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80"
    ],
    thumbnail: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    shades: [
      { id: "sh-10", name: "Sunlit Champagne", hexCode: "#dfb87c", inStock: true },
      { id: "sh-11", name: "Moonlit Opal", hexCode: "#f2ebf7", inStock: true },
      { id: "sh-12", name: "Bronze Goddess", hexCode: "#a36e3b", inStock: true }
    ],
    createdAt: "2024-02-18T09:00:00Z"
  },
  {
    id: "prod-5",
    name: "Botanical Essence Purifying Cleansing Balm",
    slug: "botanical-essence-purifying-cleansing-balm",
    brand: "LUMINA AURA",
    category: "Skincare",
    subCategory: "Cleansers",
    price: 44.0,
    compareAtPrice: 52.0,
    sku: "LUM-CLN-1029",
    stock: 60,
    rating: 4.7,
    reviewCount: 64,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    description: "A transformative sherbet-to-oil-to-milk cleansing balm that effortlessly melts away waterproof makeup, SPF, and stubborn impurities while preserving skin's essential moisture mantle. Infused with Japanese Camellia Oil and Papaya Enzymes.",
    benefits: [
      "Effortlessly dissolves waterproof mascara, long-wear foundation, and sunscreen in seconds",
      "Transforms on contact into a soothing milky emulsion that rinses away 100% clean",
      "Gently smooths dull surface dead cells with natural Papaya bio-enzymes",
      "Leaves skin petal-soft, deeply nourished, and never tight or stripped"
    ],
    howToUse: [
      "Scoop a blueberry-sized amount onto dry hands and massage onto dry face in circular motions.",
      "Add warm water to emulsify the balm into a lush milk, then rinse clean."
    ],
    ingredients: "Cetyl Ethylhexanoate, Caprylic/Capric Triglyceride, PEG-20 Glyceryl Triisostearate, Camellia Japonica Seed Oil, Carica Papaya Fruit Extract, Olea Europaea (Olive) Fruit Oil, Citrus Aurantium Dulcis Oil.",
    skinTypes: ["All Skin Types", "Dry", "Sensitive", "Oily"],
    concerns: ["Pores & Texture", "Acne & Blemishes"],
    metaTitle: "Botanical Essence Purifying Cleansing Balm | Melts Makeup & SPF",
    metaDescription: "Melt away makeup and SPF with luxurious Camellia Oil and Papaya Enzymes. Rinses clean with zero residue.",
    images: [
      "https://images.unsplash.com/photo-1556228722-d0b5b14f85e4?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80"
    ],
    thumbnail: "https://images.unsplash.com/photo-1556228722-d0b5b14f85e4?auto=format&fit=crop&w=800&q=80",
    sizes: ["100ml / 3.4 fl oz"],
    createdAt: "2024-01-20T11:00:00Z"
  },
  {
    id: "prod-6",
    name: "Petal Mist Rosewater Botanical Toner",
    slug: "petal-mist-rosewater-botanical-toner",
    brand: "LUMINA AURA",
    category: "Skincare",
    subCategory: "Toners & Mists",
    price: 38.0,
    compareAtPrice: 46.0,
    sku: "LUM-TON-5521",
    stock: 90,
    rating: 4.8,
    reviewCount: 110,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    description: "An intoxicating fine-mist toner distilled from organically cultivated Damask Roses and infused with soothing aloe, glycerin, and white tea antioxidants. Refreshes, balances skin pH, and prepares skin for optimal serum absorption.",
    benefits: [
      "Micro-fine mist spray delivers weightless, invigorating hydration on the go",
      "Balances natural skin pH and restores equilibrium after cleansing",
      "Infuses calming polyphenols from organic White Tea and Bulgarian Rose",
      "Alcohol-free, fragrance-free formula suitable for hyper-sensitive complexions"
    ],
    howToUse: [
      "Mist generously across face and neck after cleansing, or throughout the day for an instant dewy pick-me-up.",
      "Can also be sprayed over makeup to lock in a fresh, natural finish."
    ],
    ingredients: "Rosa Damascena (Rose) Hydrosol, Aloe Barbadensis Leaf Juice, Camellia Sinensis (White Tea) Extract, Glycerin, Sodium PCA, Lonicera Caprifolium (Honeysuckle) Extract.",
    skinTypes: ["All Skin Types", "Sensitive", "Dry"],
    concerns: ["Hydration & Moisture", "Dullness & Radiance"],
    metaTitle: "Petal Mist Rosewater Botanical Toner | Alcohol-Free Hydrating Mist",
    metaDescription: "Hydrate and balance skin with 100% organic Damask Rose hydrosol and White Tea. Cruelty-free luxury toner.",
    images: [
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1608248597289-53e7d6928e1d?auto=format&fit=crop&w=1000&q=80"
    ],
    thumbnail: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80",
    sizes: ["120ml / 4.0 fl oz"],
    createdAt: "2024-02-05T08:00:00Z"
  },
  {
    id: "prod-7",
    name: "Santal & Rose Petal Extrait de Parfum",
    slug: "santal-rose-petal-extrait-de-parfum",
    brand: "LUMINA AURA",
    category: "Fragrance",
    subCategory: "Perfumes",
    price: 118.0,
    compareAtPrice: 140.0,
    sku: "LUM-FRG-0012",
    stock: 19,
    rating: 5.0,
    reviewCount: 52,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    description: "An intoxicating artisanal fragrance opening with velvety Grasse rose and pink peppercorn, grounded by creamy Australian sandalwood, ambergris, and smoky cedarwood. An unforgettable, magnetic signature scent that lingers for over 14 hours.",
    benefits: [
      "High-concentration Extrait de Parfum (28% oil concentration) for extraordinary sillage and longevity",
      "Ethically sourced rare botanicals and aged Australian sandalwood",
      "Housed in a bespoke heavyweight frosted glass flacon with magnetic gold closure",
      "Unisex, sensual, and universally alluring"
    ],
    howToUse: [
      "Spritz onto pulse points: wrists, inner elbows, base of the neck, and behind earlobes.",
      "Do not rub wrists together, as this bruises the delicate top olfactory notes."
    ],
    ingredients: "Alcohol Denat., Parfum/Fragrance, Santalum Album (Sandalwood) Oil, Rosa Damascena Extract, Schinus Terebinthifolius Seed Extract, Cedarwood Oil, Coumarin, Limonene, Linalool.",
    skinTypes: ["All Skin Types"],
    concerns: ["Dullness & Radiance"],
    metaTitle: "Santal & Rose Petal Extrait de Parfum | Luxury Signature Fragrance",
    metaDescription: "Captivating Grasse Rose and creamy Australian Sandalwood in a 28% Extrait concentration. Luxury fragrance by LUMINA AURA.",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80"
    ],
    thumbnail: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    sizes: ["50ml / 1.7 fl oz", "100ml / 3.4 fl oz"],
    createdAt: "2024-02-12T16:00:00Z"
  },
  {
    id: "prod-8",
    name: "Golden Elixir Botanical Hair & Scalp Oil",
    slug: "golden-elixir-hair-scalp-oil",
    brand: "LUMINA AURA",
    category: "Haircare",
    subCategory: "Oils & Treatments",
    price: 52.0,
    compareAtPrice: 65.0,
    sku: "LUM-HAR-7719",
    stock: 35,
    rating: 4.9,
    reviewCount: 89,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    description: "A featherlight, silicon-free hair and scalp treatment elixir infused with Rosemary leaf bio-extract, cold-pressed Camellia, and Golden Jojoba. Strengthens hair follicles, eliminates flyaway frizz, and imparts mirror glass shine.",
    benefits: [
      "Clinically stimulated scalp health with potent Rosemary extract and Castor bio-actives",
      "Locks down cuticle scales to eliminate 98% of humidity-induced frizz",
      "Protects against heat styling damage up to 450°F without weighing strands down",
      "Multipurpose: pre-wash scalp treatment, leave-in shine serum, or overnight repair"
    ],
    howToUse: [
      "As a daily finisher: Warm 2–3 drops in palms and smooth through mid-lengths and ends.",
      "As a scalp ritual: Massage 1 full dropper into scalp 30 minutes before shampooing."
    ],
    ingredients: "Argania Spinosa Kernel Oil, Camellia Japonica Seed Oil, Simmondsia Chinensis Seed Oil, Rosmarinus Officinalis (Rosemary) Leaf Extract, Ricinus Communis Seed Oil, Tocopherol, Natural Botanical Fragrance.",
    skinTypes: ["All Skin Types"],
    concerns: ["Hydration & Moisture", "Dullness & Radiance"],
    metaTitle: "Golden Elixir Botanical Hair & Scalp Oil | Rosemary & Camellia Shine",
    metaDescription: "Silicon-free luxury hair oil with Rosemary and Camellia. Boosts scalp health and delivers glass-like shine.",
    images: [
      "https://images.unsplash.com/photo-1608248597359-00f738b5fa2f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1000&q=80"
    ],
    thumbnail: "https://images.unsplash.com/photo-1608248597359-00f738b5fa2f?auto=format&fit=crop&w=800&q=80",
    sizes: ["50ml / 1.7 fl oz"],
    createdAt: "2024-01-28T15:00:00Z"
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: "LUMINA15",
    description: "15% Off Your Entire Order (Welcome Offer)",
    type: "PERCENTAGE",
    value: 15,
    minOrderValue: 50,
    isActive: true,
  },
  {
    code: "GLOW20",
    description: "20% VIP Beauty Secret Discount",
    type: "PERCENTAGE",
    value: 20,
    minOrderValue: 80,
    isActive: true,
  },
  {
    code: "BEAUTY10",
    description: "$10 Off on orders above $60",
    type: "FIXED",
    value: 10,
    minOrderValue: 60,
    isActive: true,
  }
];

export const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    productId: "prod-1",
    authorName: "Elena Rostova",
    rating: 5,
    title: "Best serum I've used in 10 years",
    content: "The Luminescence serum gives such an unreal glow under makeup. My fine lines around the eyes are visibly plumped, and it feels completely weightless on sensitive skin.",
    isVerified: true,
    isApproved: true,
    date: "2024-02-14"
  },
  {
    id: "rev-2",
    productId: "prod-1",
    authorName: "Sophia Chen",
    rating: 5,
    title: "Glass skin in a bottle!",
    content: "Within 3 days of using this with the Rosewater toner, my skin looks rested, bouncy, and hyper-hydrated. The frosted glass bottle is stunning on my vanity too.",
    isVerified: true,
    isApproved: true,
    date: "2024-02-10"
  },
  {
    id: "rev-3",
    productId: "prod-3",
    authorName: "Camilla Vasquez",
    rating: 5,
    title: "Rose Quartz shade is pure magic",
    content: "Not sticky at all, smells lightly of fresh berries, and keeps lips moisturized for hours. Hands down my favorite lip oil ever.",
    isVerified: true,
    isApproved: true,
    date: "2024-02-16"
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-101",
    orderNumber: "LUM-94021",
    customerName: "Audrey Hepburn-Miller",
    customerEmail: "audrey.m@example.com",
    customerPhone: "+1 (555) 234-8901",
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedSize: "50ml / 1.7 fl oz"
      },
      {
        product: INITIAL_PRODUCTS[2],
        quantity: 2,
        selectedShade: INITIAL_PRODUCTS[2].shades?.[0]
      }
    ],
    subtotal: 136.0,
    discountAmount: 20.4,
    tax: 9.25,
    shippingCost: 0,
    totalAmount: 124.85,
    couponCode: "LUMINA15",
    status: "PROCESSING",
    shippingAddress: {
      street: "742 Evergreen Terrace",
      city: "Beverly Hills",
      state: "CA",
      postalCode: "90210",
      country: "United States"
    },
    paymentMethod: "Credit Card",
    paymentStatus: "PAID",
    createdAt: "2024-02-16T18:30:00Z"
  },
  {
    id: "ord-102",
    orderNumber: "LUM-94022",
    customerName: "Jessica Sterling",
    customerEmail: "jessica.s@example.com",
    items: [
      {
        product: INITIAL_PRODUCTS[1],
        quantity: 1,
        selectedSize: "50ml / 1.7 fl oz"
      }
    ],
    subtotal: 76.0,
    discountAmount: 0,
    tax: 6.08,
    shippingCost: 5.0,
    totalAmount: 87.08,
    status: "DELIVERED",
    shippingAddress: {
      street: "450 5th Avenue, Suite 12",
      city: "New York",
      state: "NY",
      postalCode: "10018",
      country: "United States"
    },
    paymentMethod: "Apple Pay",
    paymentStatus: "PAID",
    createdAt: "2024-02-14T11:15:00Z"
  },
  {
    id: "ord-103",
    orderNumber: "LUM-94023",
    customerName: "Zara Khan",
    customerEmail: "zara.k@example.com",
    items: [
      {
        product: INITIAL_PRODUCTS[6],
        quantity: 1,
        selectedSize: "50ml / 1.7 fl oz"
      }
    ],
    subtotal: 118.0,
    discountAmount: 23.6,
    tax: 7.55,
    shippingCost: 0,
    totalAmount: 101.95,
    couponCode: "GLOW20",
    status: "SHIPPED",
    shippingAddress: {
      street: "12 Marina Boulevard",
      city: "Miami",
      state: "FL",
      postalCode: "33139",
      country: "United States"
    },
    paymentMethod: "Credit Card",
    paymentStatus: "PAID",
    createdAt: "2024-02-15T09:40:00Z"
  }
];

export const INITIAL_CHAT_SESSIONS: ChatSession[] = [
  {
    id: "chat-sess-1",
    customerName: "Victoria Vance",
    customerEmail: "victoria.v@example.com",
    unreadAdminCount: 1,
    isResolved: false,
    lastMessage: "Hi! Does the Hydro-Dew Serum work well under SPF?",
    lastTimestamp: "Just now",
    cartContext: {
      itemCount: 2,
      total: 102.0
    },
    messages: [
      {
        id: "m-1",
        sender: "customer",
        message: "Hello! I have very sensitive skin and was wondering if the Hydro-Dew Serum works well under matte SPF?",
        timestamp: "2:14 PM",
      },
      {
        id: "m-2",
        sender: "admin",
        message: "Hello Victoria! Absolutely. It absorbs completely within 60 seconds with no pilling, making it an ideal primer under any sunscreen.",
        timestamp: "2:15 PM",
      },
      {
        id: "m-3",
        sender: "admin",
        message: "Here is an exclusive 15% VIP discount code for you to try it today!",
        timestamp: "2:16 PM",
        couponCode: "LUMINA15",
        discountVal: 15
      },
      {
        id: "m-4",
        sender: "customer",
        message: "Hi! Does the Hydro-Dew Serum work well under SPF?",
        timestamp: "2:18 PM",
      }
    ]
  }
];
