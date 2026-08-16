"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  Tag,
  MessageSquare,
  Star,
  ExternalLink,
  Sparkles,
  Menu,
  X,
  Lock,
  LogOut,
  ShieldCheck,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAdminStore } from "@/lib/store";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState("");

  const { isAuthenticated, adminLogin, adminLogout, chatSessions } = useAdminStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const unreadChatCount = chatSessions.reduce(
    (acc, sess) => acc + (sess.unreadAdminCount || 0),
    0
  );

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Products Catalog", href: "/admin/products", icon: Package },
    { label: "Add New Product", href: "/admin/products/new", icon: PlusCircle },
    { label: "Orders & Shipping", href: "/admin/orders", icon: ShoppingBag },
    { label: "Coupons & Discounts", href: "/admin/coupons", icon: Tag },
    {
      label: "Live Chat Inbox",
      href: "/admin/chat",
      icon: MessageSquare,
      badge: unreadChatCount > 0 ? unreadChatCount : undefined,
    },
    { label: "Review Moderation", href: "/admin/reviews", icon: Star },
  ];

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const success = await adminLogin(loginEmail, loginPass);
    if (!success) {
      setLoginError("Invalid credentials. Please enter your authorized Admin Password.");
    }
  };

  // Prevent SSR mismatch on Zustand client hydration
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-xs text-foreground/50">
        Loading FAADII Secure Suite...
      </div>
    );
  }

  // 1. Password Protected Login Gatekeeper
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-obsidian to-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-white/90 dark:bg-obsidian/90 backdrop-blur-2xl border border-white/20 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-500 to-gold-400 p-[2px] mx-auto shadow-lg">
              <div className="w-full h-full rounded-2xl bg-white dark:bg-obsidian flex items-center justify-center">
                <Lock className="w-6 h-6 text-brand-600" />
              </div>
            </div>
            <h1 className="font-serif text-2xl font-bold text-foreground">
              FAADII Admin Portal
            </h1>
            <p className="text-xs text-foreground/60">
              Restricted Area. Authorized access only.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-100 text-rose-800 text-xs font-semibold">
                {loginError}
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1 block">
                Admin Username / Email
              </label>
              <input
                type="text"
                placeholder="fahad@faadii.com or fahad"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="w-full p-3 rounded-xl glass-input text-xs font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1 block">
                Password / Passcode
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your admin password"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  required
                  className="w-full p-3 pr-10 rounded-xl glass-input text-xs font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3 text-foreground/40 hover:text-foreground"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 via-brand-600 to-gold-500 hover:brightness-105 text-white font-semibold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Unlock Admin Suite</span>
            </button>
          </form>

          <div className="pt-2 text-center border-t border-border/40">
            <Link href="/" className="text-xs text-brand-600 hover:underline">
              ← Return to Client Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard Layout
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-obsidian/90 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border/50 bg-white/80 dark:bg-obsidian/90 backdrop-blur-2xl p-6 justify-between shrink-0 fixed inset-y-0 z-30">
        <div className="space-y-6">
          {/* Logo */}
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-500 to-gold-400 p-[1.5px]">
              <div className="w-full h-full rounded-xl bg-white dark:bg-obsidian flex items-center justify-center font-serif font-bold text-xs text-brand-600">
                F
              </div>
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-foreground">
                FAADII
              </span>
              <span className="text-[10px] block uppercase tracking-widest text-brand-600 font-bold -mt-1">
                Admin Suite
              </span>
            </div>
          </Link>

          {/* Navigation links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-brand-500 text-white shadow-sm"
                      : "text-foreground/70 hover:bg-brand-50/60 dark:hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gold-400 text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions: Store link + Logout */}
        <div className="pt-4 border-t border-border/50 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-border/50 text-xs font-semibold text-foreground/80 hover:text-brand-600 transition-colors shadow-xs"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Client Store</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-foreground/40" />
          </Link>

          <button
            onClick={adminLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Secure Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Mobile Bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/85 dark:bg-obsidian/90 backdrop-blur-xl border-b border-border/50 p-4 flex items-center justify-between">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-2 rounded-xl text-foreground"
          >
            {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="font-serif font-bold text-base">FAADII Admin</span>
          <button onClick={adminLogout} className="text-xs text-rose-600 font-semibold">
            Logout
          </button>
        </header>

        {/* Mobile Nav Drawer */}
        {mobileNavOpen && (
          <div className="lg:hidden p-4 bg-white/95 border-b border-border/50 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className="flex items-center justify-between p-2 rounded-xl text-xs font-medium text-foreground hover:bg-brand-50"
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-brand-500 text-white rounded-full text-[10px]">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}

        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
