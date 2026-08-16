import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  count?: number;
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  size = "md",
  showCount = false,
  count,
  className,
}) => {
  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }).map((_, index) => {
          const filled = index + 1 <= Math.floor(rating);
          const half = index < rating && index + 1 > Math.floor(rating);

          return (
            <Star
              key={index}
              className={cn(
                iconSizes[size],
                "transition-transform",
                filled
                  ? "fill-gold-400 text-gold-400"
                  : half
                  ? "fill-gold-300/50 text-gold-400"
                  : "text-foreground/20"
              )}
            />
          );
        })}
      </div>
      {showCount && (
        <span className="text-xs text-foreground/70 font-medium ml-1">
          {rating.toFixed(1)} {count !== undefined && `(${count})`}
        </span>
      )}
    </div>
  );
};
