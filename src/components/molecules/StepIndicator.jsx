import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StepIndicator = ({ 
  steps, 
  currentStep, 
  className 
}) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        
        return (
          <React.Fragment key={step.id}>
            <div className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200",
                  isCompleted && "bg-emerald-600 border-emerald-600 text-white",
                  isActive && "bg-primary-600 border-primary-600 text-white",
                  !isActive && !isCompleted && "border-gray-600 text-gray-400"
                )}
              >
                {isCompleted ? (
                  <ApperIcon name="Check" size={16} />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <div className="ml-3">
                <p
                  className={cn(
                    "text-sm font-medium",
                    isActive && "text-primary-400",
                    isCompleted && "text-emerald-400",
                    !isActive && !isCompleted && "text-gray-400"
                  )}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-4 transition-colors duration-200",
                  index < currentStep ? "bg-emerald-600" : "bg-gray-700"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;