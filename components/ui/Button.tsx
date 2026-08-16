"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "outline" | "glass" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary:
        "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-md hover:shadow-lg hover:from-brand-600 hover:to-brand-700 active:scale-[0.98]",
      secondary:
        "bg-brand-100/70 text-brand-900 hover:bg-brand-200/80 border border-brand-200/50 backdrop-blur-sm",
      gold:
        "bg-gradient-to-r from-gold-400 to-gold-600 text-white shadow-glass-glow hover:brightness-105 active:scale-[0.98]",
      glass:
        "bg-white/40 text-foreground hover:bg-white/70 border border-white/60 backdrop-blur-md shadow-sm",
      outline:
        "border border-brand-400/40 text-brand-700 dark:text-brand-300 hover:bg-brand-50/50 dark:hover:bg-brand-950/30",
      ghost:
        "text-foreground hover:bg-black/5 dark:hover:bg-white/5",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
      md: "h-11 px-5 text-sm rounded-xl gap-2",
      lg: "h-13 px-7 text-base rounded-2xl gap-2.5",
      icon: "h-10 w-10 p-0 rounded-xl justify-center items-center",
    };

    return (
      <motion.button
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors tracking-wide disabled:opacity-50 disabled:pointer-events-none select-none",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...(props as any)}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
