import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel border-b border-gray-700/50 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Zap" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-semibold gradient-text">
                SiteForge Pro
              </h1>
              <p className="text-sm text-gray-400">AI-Powered Website Generator</p>
            </div>
          </div>
          <Badge variant="primary">Beta</Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            API Status: Ready
          </div>
          
          <div className="flex items-center gap-2">
            <ApperIcon name="Github" size={20} className="text-gray-400 hover:text-gray-300 cursor-pointer transition-colors" />
            <ApperIcon name="HelpCircle" size={20} className="text-gray-400 hover:text-gray-300 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;