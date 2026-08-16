export type SkinType = "All Skin Types" | "Dry" | "Oily" | "Combination" | "Sensitive" | "Normal";

export type SkinConcern = 
  | "Hydration & Moisture" 
  | "Anti-Aging & Fine Lines" 
  | "Dark Spots & Hyperpigmentation" 
  | "Acne & Blemishes" 
  | "Pores & Texture" 
  | "Dullness & Radiance" 
  | "Sun Protection";

export interface ShadeVariant {
  id: string;
  name: string;
  hexCode: string;
  inStock: boolean;
}

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  rating: number; // 1 - 5
  title: string;
  content: string;
  images?: string[];
  isVerified: boolean;
  isApproved: boolean;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: "Skincare" | "Makeup" | "Haircare" | "Body Care" | "Fragrance";
  subCategory?: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isArchived?: boolean;

  // AI Generated / Editable Content
  description: string;
  benefits: string[];
  howToUse: string[];
  ingredients: string;
  skinTypes: string[];
  concerns: string[];

  // SEO
  metaTitle?: string;
  metaDescription?: string;

  // Visuals & Options
  images: string[];
  thumbnail: string;
  shades?: ShadeVariant[];
  sizes?: string[];
  selectedShade?: ShadeVariant;
  selectedSize?: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedShade?: ShadeVariant;
  selectedSize?: string;
}

export interface Coupon {
  code: string;
  description: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  minOrderValue?: number;
  isActive: boolean;
  expiresAt?: string;
}

export type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  tax: number;
  shippingCost: number;
  totalAmount: number;
  couponCode?: string;
  status: OrderStatus;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: "Scan QR Pay" | "JazzCash / Easypaisa" | "Bank Transfer" | "Cash on Delivery" | "Credit Card" | "Apple Pay";
  paymentStatus: "PAID" | "PENDING";
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: "customer" | "admin" | "bot";
  message: string;
  timestamp: string;
  couponCode?: string;
  discountVal?: number;
  isRead?: boolean;
}

export interface ChatSession {
  id: string;
  customerName: string;
  customerEmail?: string;
  messages: ChatMessage[];
  unreadAdminCount: number;
  lastMessage: string;
  lastTimestamp: string;
  isResolved: boolean;
  cartContext?: {
    itemCount: number;
    total: number;
  };
}

export interface GenerateProductInfoRequest {
  name: string;
  category: string;
  keywords?: string;
  ingredients?: string;
  brand?: string;
}

export interface GenerateProductInfoResponse {
  description: string;
  benefits: string[];
  howToUse: string[];
  ingredients: string;
  metaTitle: string;
  metaDescription: string;
  suggestedConcerns: string[];
  suggestedSkinTypes: string[];
}
