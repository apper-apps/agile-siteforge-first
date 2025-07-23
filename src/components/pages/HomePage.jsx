import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import AreasManager from "@/components/organisms/AreasManager";
import BusinessInfoForm from "@/components/organisms/BusinessInfoForm";
import Header from "@/components/organisms/Header";
import GenerationPanel from "@/components/organisms/GenerationPanel";
import ServicesManager from "@/components/organisms/ServicesManager";
import ConfigurationForm from "@/components/organisms/ConfigurationForm";
import StepIndicator from "@/components/molecules/StepIndicator";
import Button from "@/components/atoms/Button";
import useWebsiteGenerator from "@/hooks/useWebsiteGenerator";

const HomePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [businessInfo, setBusinessInfo] = useState({
    name: "",
    phone: "",
    address: "",
    company: "",
    city: "",
    description: "",
    niche: "",
    keywords: "",
    websiteSlug: "",
    areaPageSlug: "service-areas"
  });
  
  const [services, setServices] = useState([]);
  const [areas, setAreas] = useState([]);
  const [config, setConfig] = useState({
    pageType: "multi",
    colors: {
      primary: "#6366F1",
      secondary: "#8B5CF6",
      accent: "#10B981"
    },
    aiModel: "gemini",
    apiKey: "",
    hosting: "netlify"
  });

  const [errors, setErrors] = useState({});
  const { generateWebsite, isGenerating, error } = useWebsiteGenerator();
  const steps = [
    {
      id: "business",
      title: "Business Info",
      description: "Basic business details"
    },
    {
      id: "services",
      title: "Services",
      description: "Add your services"
    },
    {
      id: "areas",
      title: "Service Areas",
      description: "Define coverage areas"
    },
    {
      id: "config",
      title: "Configuration",
      description: "AI and design settings"
    },
    {
      id: "generate",
      title: "Generate",
      description: "Create your website"
    }
  ];

  const validateStep = (stepIndex) => {
    const newErrors = {};
    
    switch (stepIndex) {
      case 0: // Business Info
        if (!businessInfo.name) newErrors.name = "Business name is required";
        if (!businessInfo.company) newErrors.company = "Company name is required";
        if (!businessInfo.phone) newErrors.phone = "Phone number is required";
        if (!businessInfo.address) newErrors.address = "Address is required";
        if (!businessInfo.city) newErrors.city = "City is required";
        if (!businessInfo.description) newErrors.description = "Description is required";
        if (!businessInfo.niche) newErrors.niche = "Business niche is required";
        if (!businessInfo.keywords) newErrors.keywords = "SEO keywords are required";
        if (!businessInfo.websiteSlug) newErrors.websiteSlug = "Website slug is required";
        break;
        
      case 1: // Services
        if (services.length === 0) {
          toast.error("Please add at least one service");
          return false;
        }
        break;
        
case 3: // Configuration
        if (!config.apiKey?.trim()) {
          newErrors.apiKey = "API key is required";
        } else {
          // Validate API key format based on selected model
          const isValidKey = validateAPIKey(config.aiModel, config.apiKey);
          if (!isValidKey) {
            newErrors.apiKey = `Invalid API key format for ${config.aiModel}`;
          }
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

const handleGenerate = async (onProgress) => {
    try {
      const zipBlob = await generateWebsite({
        businessInfo,
        services,
        areas,
        config,
        onProgress
      });

      // Create download link
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${businessInfo.websiteSlug || 'website'}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Website generated and downloaded successfully!");
      return zipBlob;
    } catch (error) {
      console.error("Website generation failed:", error);
      toast.error(error.message || "Failed to generate website. Please try again.");
      throw error;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <BusinessInfoForm
            businessInfo={businessInfo}
            setBusinessInfo={setBusinessInfo}
            errors={errors}
          />
        );
      case 1:
        return (
          <ServicesManager
            services={services}
            setServices={setServices}
          />
        );
      case 2:
        return (
          <AreasManager
            areas={areas}
            setAreas={setAreas}
          />
        );
      case 3:
        return (
          <ConfigurationForm
            config={config}
            setConfig={setConfig}
            errors={errors}
          />
        );
case 4:
return (
          <GenerationPanel
            businessInfo={businessInfo}
            services={services}
            areas={areas}
            config={config}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            error={error}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            className="max-w-4xl mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="glass-panel rounded-lg p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-display font-semibold text-gray-100 mb-2">
                  {steps[currentStep].title}
                </h2>
                <p className="text-gray-400">{steps[currentStep].description}</p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              {currentStep < 4 && (
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
                  <Button
                    variant="ghost"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
                    Previous
                  </Button>
                  
                  <Button onClick={handleNext}>
                    Next
                    <ApperIcon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Overview */}
            <div className="glass-panel rounded-lg p-6">
              <h3 className="font-semibold text-gray-100 mb-4">Project Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Business Name:</span>
                  <span className="text-gray-300">{businessInfo.name || "Not set"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Services:</span>
                  <span className="text-gray-300">{services.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Areas:</span>
                  <span className="text-gray-300">{areas.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Page Type:</span>
                  <span className="text-gray-300 capitalize">{config.pageType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">AI Model:</span>
                  <span className="text-gray-300 uppercase">{config.aiModel}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="glass-panel rounded-lg p-6">
              <h3 className="font-semibold text-gray-100 mb-4">Included Features</h3>
              <div className="space-y-2 text-sm">
                {[
                  "SEO-optimized HTML5",
                  "Responsive Tailwind CSS",
                  "Font Awesome 6.4.0 icons",
                  "Interactive JavaScript",
                  "Google Maps integration",
                  "Schema.org markup",
                  "Netlify deployment ready",
                  "Performance optimized"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <ApperIcon name="Check" size={14} className="text-emerald-400" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="glass-panel rounded-lg p-6">
              <h3 className="font-semibold text-gray-100 mb-4">
                <ApperIcon name="Lightbulb" size={16} className="inline mr-2 text-amber-400" />
                Tips
              </h3>
              <div className="space-y-3 text-sm text-gray-400">
                <p>• Add specific services for better SEO targeting</p>
                <p>• Include surrounding cities in service areas</p>
                <p>• Use your brand colors for consistent design</p>
                <p>• Choose the AI model that best fits your needs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const validateAPIKey = (aiModel, apiKey) => {
  if (!apiKey || !apiKey.trim()) return false;
  
  const validationPatterns = {
    openai: /^sk-[a-zA-Z0-9]{48}$/,
    claude: /^sk-ant-api03-/,
    gemini: /^AIza[a-zA-Z0-9_-]{35}$/,
    openrouter: /^sk-or-v1-/,
    together: /^[a-f0-9]{64}$/,
    llama: /^hf_[a-zA-Z0-9]{34}$/
  };
  
  const pattern = validationPatterns[aiModel];
  if (!pattern) return true; // Allow unknown models
  
  return pattern.test(apiKey.trim());
};

export default HomePage;