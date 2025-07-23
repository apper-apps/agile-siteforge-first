import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  title = "Error"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <div className="text-center space-y-4 max-w-md">
        <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
          <ApperIcon name="AlertCircle" size={32} className="text-red-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-2">{title}</h3>
          <p className="text-gray-400 text-sm">{message}</p>
        </div>
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            <ApperIcon name="RefreshCw" size={16} className="mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Error;