import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const Empty = ({ 
  title = "No data available",
  message = "Get started by adding some content",
  actionLabel,
  onAction,
  icon = "Package"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <div className="text-center space-y-4 max-w-md">
        <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto">
          <ApperIcon name={icon} size={40} className="text-gray-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-2">{title}</h3>
          <p className="text-gray-400 text-sm">{message}</p>
        </div>
        {onAction && actionLabel && (
          <Button onClick={onAction}>
            <ApperIcon name="Plus" size={16} className="mr-2" />
            {actionLabel}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;