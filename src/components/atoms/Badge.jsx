import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "default",
  children,
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gray-700 text-gray-300",
    primary: "bg-primary-900/50 text-primary-300 border border-primary-700/50",
    success: "bg-emerald-900/50 text-emerald-300 border border-emerald-700/50",
    warning: "bg-amber-900/50 text-amber-300 border border-amber-700/50",
    danger: "bg-red-900/50 text-red-300 border border-red-700/50"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;