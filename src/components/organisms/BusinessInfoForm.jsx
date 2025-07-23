import React from "react";
import FormField from "@/components/molecules/FormField";
import { motion } from "framer-motion";

const BusinessInfoForm = ({ 
  businessInfo, 
  setBusinessInfo, 
  errors = {} 
}) => {
  const handleChange = (field, value) => {
    setBusinessInfo(prev => ({
      ...prev,
      [field]: value
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
          label="Business Name"
          required
          value={businessInfo.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="ABC Roofing Services"
          error={errors.name}
        />
        
        <FormField
          label="Company Name"
          required
          value={businessInfo.company}
          onChange={(e) => handleChange("company", e.target.value)}
          placeholder="ABC Roofing LLC"
          error={errors.company}
        />
        
        <FormField
          label="Phone Number"
          required
          type="tel"
          value={businessInfo.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="(555) 123-4567"
          error={errors.phone}
        />
        
        <FormField
          label="City"
          required
          value={businessInfo.city}
          onChange={(e) => handleChange("city", e.target.value)}
          placeholder="Denver"
          error={errors.city}
        />
      </div>
      
      <FormField
        label="Business Address"
        required
        value={businessInfo.address}
        onChange={(e) => handleChange("address", e.target.value)}
        placeholder="123 Main St, Denver, CO 80202"
        error={errors.address}
      />
      
      <FormField
        label="Business Description"
        required
        type="textarea"
        rows={4}
        value={businessInfo.description}
        onChange={(e) => handleChange("description", e.target.value)}
        placeholder="Describe your business, services, and what makes you unique..."
        error={errors.description}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Business Niche"
          required
          value={businessInfo.niche}
          onChange={(e) => handleChange("niche", e.target.value)}
          placeholder="Residential Roofing"
          error={errors.niche}
        />
        
        <FormField
          label="SEO Keywords (comma-separated)"
          required
          value={businessInfo.keywords}
          onChange={(e) => handleChange("keywords", e.target.value)}
          placeholder="roofing, roof repair, roof installation"
          error={errors.keywords}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Website Slug"
          required
          value={businessInfo.websiteSlug}
          onChange={(e) => handleChange("websiteSlug", e.target.value)}
          placeholder="abc-roofing"
          error={errors.websiteSlug}
        />
        
        <FormField
          label="Area Page Slug"
          required
          value={businessInfo.areaPageSlug}
          onChange={(e) => handleChange("areaPageSlug", e.target.value)}
          placeholder="service-areas"
          error={errors.areaPageSlug}
        />
      </div>
    </motion.div>
  );
};

export default BusinessInfoForm;