import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "brand" | "gold" | "lavender" | "glass" | "success" | "outline";
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "brand",
  children,
  className,
  ...props
}) => {
  const variants = {
    brand: "bg-brand-100/80 text-brand-700 border-brand-200/60",
    gold: "bg-gold-100/90 text-gold-700 border-gold-300/50 shadow-sm",
    lavender: "bg-lavender-100/80 text-lavender-700 border-lavender-200/60",
    glass: "bg-white/50 text-foreground border-white/60 backdrop-blur-md",
    success: "bg-emerald-100/80 text-emerald-700 border-emerald-200/60",
    outline: "bg-transparent text-foreground border-foreground/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-xs tracking-wider uppercase",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
