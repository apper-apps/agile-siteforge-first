import React from "react";
import FormField from "@/components/molecules/FormField";
import ColorPicker from "@/components/molecules/ColorPicker";
import { motion } from "framer-motion";

const ConfigurationForm = ({ 
  config, 
  setConfig, 
  errors = {} 
}) => {
  const handleChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleColorChange = (colorType, value) => {
    setConfig(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorType]: value
      }
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Page Type"
          required
          type="select"
          value={config.pageType}
          onChange={(e) => handleChange("pageType", e.target.value)}
          error={errors.pageType}
        >
          <option value="single">Single Page</option>
          <option value="multi">Multi Page</option>
        </FormField>
        
        <FormField
          label="AI Model"
          required
          type="select"
          value={config.aiModel}
          onChange={(e) => handleChange("aiModel", e.target.value)}
          error={errors.aiModel}
        >
          <option value="openai">OpenAI GPT</option>
          <option value="claude">Anthropic Claude</option>
          <option value="llama">Llama 3.1.8</option>
        </FormField>
      </div>
      
      <FormField
        label="AI API Key"
        required
        type="password"
        value={config.apiKey}
        onChange={(e) => handleChange("apiKey", e.target.value)}
        placeholder="Enter your API key..."
        error={errors.apiKey}
      />
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-100">Brand Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ColorPicker
            label="Primary Color"
            required
            value={config.colors.primary}
            onChange={(value) => handleColorChange("primary", value)}
          />
          
          <ColorPicker
            label="Secondary Color"
            required
            value={config.colors.secondary}
            onChange={(value) => handleColorChange("secondary", value)}
          />
          
          <ColorPicker
            label="Accent Color"
            required
            value={config.colors.accent}
            onChange={(value) => handleColorChange("accent", value)}
          />
        </div>
      </div>
      
      <div className="glass-panel rounded-lg p-4">
        <h4 className="font-medium text-gray-100 mb-2">Hosting Configuration</h4>
        <p className="text-sm text-gray-400 mb-3">
          Currently configured for Netlify deployment with optimized build settings.
        </p>
        <div className="bg-gray-800 rounded p-3">
          <p className="text-sm text-emerald-400 font-mono">✓ Netlify Ready</p>
          <p className="text-xs text-gray-500 mt-1">Includes _redirects, headers, and build optimization</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ConfigurationForm;