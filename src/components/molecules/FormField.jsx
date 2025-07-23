import React from "react";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import { cn } from "@/utils/cn";

const FormField = ({ 
  label, 
  error, 
  required, 
  className,
  type = "input",
  children,
  ...props 
}) => {
  const renderInput = () => {
    switch (type) {
      case "textarea":
        return <Textarea error={error} {...props} />;
      case "select":
        return <Select error={error} {...props}>{children}</Select>;
      default:
        return <Input error={error} {...props} />;
    }
  };

  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <Label required={required}>
          {label}
        </Label>
      )}
      {renderInput()}
      {error && (
        <p className="text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;