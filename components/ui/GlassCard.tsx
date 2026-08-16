import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: "gold" | "rose" | "none";
  interactive?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glow = "none",
  interactive = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 backdrop-blur-glass border transition-all duration-300",
        interactive
          ? "glass-card cursor-pointer"
          : "glass-panel",
        glow === "gold" && "border-gold-300/40 shadow-glass-glow",
        glow === "rose" && "border-brand-300/40 shadow-glass-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
