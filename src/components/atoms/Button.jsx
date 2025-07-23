import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "default", 
  children,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white focus:ring-primary-500/20 hover:scale-105",
    secondary: "bg-gray-700 hover:bg-gray-600 text-gray-100 focus:ring-gray-500/20 hover:scale-105",
    outline: "border border-gray-600 hover:border-primary-500 text-gray-300 hover:text-primary-400 focus:ring-primary-500/20 hover:scale-105",
    ghost: "text-gray-400 hover:text-gray-100 hover:bg-gray-800 focus:ring-gray-500/20",
    success: "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white focus:ring-emerald-500/20 hover:scale-105",
    danger: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white focus:ring-red-500/20 hover:scale-105"
  };
  
  const sizes = {
    sm: "px-3 py-2 text-sm rounded-md",
    default: "px-6 py-3 text-sm rounded-lg",
    lg: "px-8 py-4 text-base rounded-lg"
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;