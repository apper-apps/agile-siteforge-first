import React, { useState } from "react";
import Label from "@/components/atoms/Label";
import { cn } from "@/utils/cn";

const ColorPicker = ({ 
  label, 
  value, 
  onChange, 
  className,
  required 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const presetColors = [
    "#6366F1", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444",
    "#3B82F6", "#EC4899", "#14B8A6", "#F97316", "#84CC16",
    "#6B7280", "#1F2937", "#374151", "#4B5563", "#9CA3AF"
  ];

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label required={required}>{label}</Label>}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-3 input-field"
        >
          <div 
            className="w-6 h-6 rounded border border-gray-600"
            style={{ backgroundColor: value }}
          />
          <span className="flex-1 text-left">{value}</span>
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 glass-panel rounded-lg p-4 z-50">
            <div className="grid grid-cols-5 gap-2 mb-3">
              {presetColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    onChange(color);
                    setIsOpen(false);
                  }}
                  className="w-8 h-8 rounded border-2 border-gray-600 hover:border-primary-400 transition-colors"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;