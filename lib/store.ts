import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem, Coupon, Order, ChatSession, ChatMessage, ShadeVariant } from "./types";
import { INITIAL_PRODUCTS, INITIAL_COUPONS, INITIAL_ORDERS, INITIAL_CHAT_SESSIONS } from "./mock-data";

// Admin credentials – bcrypt hashes (password: "03247506808")
const ADMIN_USERS: Record<string, string> = {
  "admin@faadii.com": "$2b$10$BIDKieB95rwbJY3SFVTMlu9iUpzN43YDmF7mAGL3LUsO4jRPSJpbi",
  "fahad@faadii.com": "$2b$10$BIDKieB95rwbJY3SFVTMlu9iUpzN43YDmF7mAGL3LUsO4jRPSJpbi",
};


interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  appliedCoupon: Coupon | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number, shade?: ShadeVariant, size?: string) => void;
  removeItem: (productId: string, shadeId?: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, shadeId?: string, size?: string) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getTax: () => number;
  getShipping: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [
        {
          product: INITIAL_PRODUCTS[0],
          quantity: 1,
          selectedSize: "50ml / 1.7 fl oz"
        }
      ],
      isOpen: false,
      appliedCoupon: null,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, quantity = 1, shade, size) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedShade?.id === shade?.id &&
              item.selectedSize === size
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += quantity;
            return { items: updated, isOpen: true };
          } else {
            return {
              items: [
                ...state.items,
                {
                  product,
                  quantity,
                  selectedShade: shade,
                  selectedSize: size || product.sizes?.[0],
                },
              ],
              isOpen: true,
            };
          }
        });
      },

      removeItem: (productId, shadeId, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedShade?.id === shadeId &&
                item.selectedSize === size
              )
          ),
        }));
      },

      updateQuantity: (productId, quantity, shadeId, size) => {
        if (quantity <= 0) {
          get().removeItem(productId, shadeId, size);
          return;
        }
        set((state) => ({
          items: state.items.map((item) => {
            if (
              item.product.id === productId &&
              item.selectedShade?.id === shadeId &&
              item.selectedSize === size
            ) {
              return { ...item, quantity };
            }
            return item;
          }),
        }));
      },

      applyCoupon: (code: string) => {
        const normalized = code.trim().toUpperCase();
        const found = INITIAL_COUPONS.find(
          (c) => c.code.toUpperCase() === normalized && c.isActive
        );

        if (!found) {
          return { success: false, message: "Invalid or expired promo code" };
        }

        const subtotal = get().getSubtotal();
        if (found.minOrderValue && subtotal < found.minOrderValue) {
          return {
            success: false,
            message: `Minimum order of $${found.minOrderValue} required for this code.`,
          };
        }

        set({ appliedCoupon: found });
        return { success: true, message: `Coupon ${found.code} applied successfully!` };
      },

      removeCoupon: () => set({ appliedCoupon: null }),
      clearCart: () => set({ items: [], appliedCoupon: null }),

      getSubtotal: () => {
        return get().items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        const coupon = get().appliedCoupon;
        if (!coupon) return 0;
        if (coupon.type === "PERCENTAGE") {
          return (subtotal * coupon.value) / 100;
        }
        return Math.min(coupon.value, subtotal);
      },

      getTax: () => {
        const taxable = get().getSubtotal() - get().getDiscountAmount();
        return Math.max(0, taxable * 0.08); // 8% standard tax
      },

      getShipping: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= 70 ? 0 : 7.0; // Free shipping over $70
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return Math.max(0, subtotal - get().getDiscountAmount() + get().getTax() + get().getShipping());
      },

      getItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: "lumina_cart_storage",
    }
  )
);

// Wishlist Store
interface WishlistStore {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeItem: (productId: string) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [INITIAL_PRODUCTS[1]],
      toggleWishlist: (product) => {
        const exists = get().items.some((p) => p.id === product.id);
        if (exists) {
          set({ items: get().items.filter((p) => p.id !== product.id) });
        } else {
          set({ items: [...get().items, product] });
        }
      },
      isInWishlist: (productId) => get().items.some((p) => p.id === productId),
      removeItem: (productId) =>
        set({ items: get().items.filter((p) => p.id !== productId) }),
    }),
    {
      name: "lumina_wishlist_storage",
    }
  )
);

// Admin Data Management Store
interface AdminStore {
  isAuthenticated: boolean;
  adminLogin: (email: string, pass: string) => Promise<boolean>;
  adminLogout: () => void;
  products: Product[];
  orders: Order[];
  coupons: Coupon[];
  chatSessions: ChatSession[];
  
  // Product actions
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductArchive: (id: string) => void;
  bulkDeleteProducts: (ids: string[]) => void;
  bulkUpdatePricePercent: (ids: string[], percent: number) => void;
  
  // Order actions
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  createOrder: (order: Order) => void;

  // Coupon actions
  addCoupon: (coupon: Coupon) => void;
  toggleCoupon: (code: string) => void;
  deleteCoupon: (code: string) => void;

  // Chat actions
  sendAdminChatMessage: (sessionId: string, message: string, couponCode?: string, discountVal?: number) => void;
  sendCustomerChatMessage: (sessionId: string, message: string) => void;
  resolveChatSession: (sessionId: string) => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      adminLogin: async (email, pass) => {
        try {
          const bcrypt = await import("bcryptjs");
          const hash = ADMIN_USERS[email.trim().toLowerCase()];
          if (!hash) return false;
          const match = await bcrypt.compare(pass.trim(), hash);
          if (match) {
            set({ isAuthenticated: true });
            return true;
          }
        } catch (e) {
          console.error("Auth error:", e);
        }
        return false;
      },
      adminLogout: () => set({ isAuthenticated: false }),
      products: INITIAL_PRODUCTS,
      orders: INITIAL_ORDERS,
      coupons: INITIAL_COUPONS,
      chatSessions: INITIAL_CHAT_SESSIONS,

      addProduct: (product) => {
        set((state) => ({ products: [product, ...state.products] }));
      },

      updateProduct: (id, updatedFields) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      toggleProductArchive: (id) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, isArchived: !p.isArchived } : p
          ),
        }));
      },

      bulkDeleteProducts: (ids) => {
        set((state) => ({
          products: state.products.filter((p) => !ids.includes(p.id)),
        }));
      },

      bulkUpdatePricePercent: (ids, percent) => {
        set((state) => ({
          products: state.products.map((p) => {
            if (ids.includes(p.id)) {
              const multiplier = 1 + percent / 100;
              const newPrice = Math.round(p.price * multiplier * 100) / 100;
              return { ...p, price: newPrice };
            }
            return p;
          }),
        }));
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
        }));
      },

      createOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },

      addCoupon: (coupon) => {
        set((state) => ({ coupons: [coupon, ...state.coupons] }));
      },

      toggleCoupon: (code) => {
        set((state) => ({
          coupons: state.coupons.map((c) =>
            c.code === code ? { ...c, isActive: !c.isActive } : c
          ),
        }));
      },

      deleteCoupon: (code) => {
        set((state) => ({
          coupons: state.coupons.filter((c) => c.code !== code),
        }));
      },

      sendAdminChatMessage: (sessionId, message, couponCode, discountVal) => {
        const newMsg: ChatMessage = {
          id: `msg-${Date.now()}`,
          sender: "admin",
          message,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          couponCode,
          discountVal,
        };

        set((state) => ({
          chatSessions: state.chatSessions.map((sess) => {
            if (sess.id === sessionId) {
              return {
                ...sess,
                messages: [...sess.messages, newMsg],
                lastMessage: message,
                lastTimestamp: "Just now",
              };
            }
            return sess;
          }),
        }));
      },

      sendCustomerChatMessage: (sessionId, message) => {
        const newMsg: ChatMessage = {
          id: `msg-${Date.now()}`,
          sender: "customer",
          message,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        set((state) => ({
          chatSessions: state.chatSessions.map((sess) => {
            if (sess.id === sessionId) {
              return {
                ...sess,
                messages: [...sess.messages, newMsg],
                lastMessage: message,
                lastTimestamp: "Just now",
                unreadAdminCount: sess.unreadAdminCount + 1,
              };
            }
            return sess;
          }),
        }));
      },

      resolveChatSession: (sessionId) => {
        set((state) => ({
          chatSessions: state.chatSessions.map((sess) =>
            sess.id === sessionId ? { ...sess, isResolved: true } : sess
          ),
        }));
      },
    }),
    {
      name: "lumina_admin_storage",
    }
  )
);
