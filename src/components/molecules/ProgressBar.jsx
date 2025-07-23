import React from "react";
import { cn } from "@/utils/cn";

const ProgressBar = ({ 
  value, 
  max = 100, 
  className,
  showLabel = true,
  label 
}) => {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className={cn("space-y-2", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">{label || "Progress"}</span>
          <span className="text-gray-400">{percentage}%</span>
        </div>
      )}
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;