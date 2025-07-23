import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import ProgressBar from "@/components/molecules/ProgressBar";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const GenerationPanel = ({ 
  businessInfo, 
  services, 
  areas, 
  config,
  onGenerate 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [generatedFiles, setGeneratedFiles] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const generationSteps = [
    "Initializing AI content generation...",
    "Generating homepage content...",
    "Creating service pages...",
    "Building area pages...",
    "Generating sitemap and SEO files...",
    "Compiling assets and scripts...",
    "Creating downloadable package..."
  ];

const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setProgress(0);
      setGeneratedFiles([]);
      setDownloadUrl(null);

      // Real AI-powered generation process
      if (onGenerate) {
        await onGenerate({
          businessInfo,
          services,
          areas,
          config,
          onProgress: (progress, step, files) => {
            setProgress(progress);
            setCurrentStep(step);
            if (files) {
              setGeneratedFiles(prev => [...prev, ...files]);
            }
          }
        });
      }

      // Create download URL for the generated package
      setDownloadUrl(`${businessInfo.websiteSlug || "website"}.zip`);
      toast.success("Website generated successfully!");
      
    } catch (error) {
      const errorMessage = error.message || "Generation failed. Please try again.";
      toast.error(errorMessage);
      console.error("Generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    // In a real implementation, this would trigger the actual ZIP download
    toast.success("Download started!");
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "html": return "FileText";
      case "css": return "Palette";
      case "js": return "Code2";
      case "xml": return "Database";
      case "txt": return "FileText";
      default: return "File";
    }
  };

  const isReadyToGenerate = businessInfo.name && businessInfo.company && 
                           businessInfo.phone && businessInfo.address && 
                           config.apiKey && services.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="glass-panel rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Generation Summary</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text">{services.length}</div>
            <div className="text-sm text-gray-400">Services</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text">{areas.length}</div>
            <div className="text-sm text-gray-400">Areas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text">
              {config.pageType === "multi" ? services.length + areas.length + 1 : 1}
            </div>
            <div className="text-sm text-gray-400">Pages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text">7+</div>
            <div className="text-sm text-gray-400">Files</div>
          </div>
        </div>

        {!isReadyToGenerate && (
          <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <ApperIcon name="AlertTriangle" size={20} className="text-amber-400" />
              <div>
                <h4 className="font-medium text-amber-300">Missing Required Information</h4>
                <p className="text-sm text-amber-200/80">
                  Please complete all required fields and add at least one service.
                </p>
              </div>
            </div>
          </div>
        )}

        <Button 
          onClick={handleGenerate}
          disabled={!isReadyToGenerate || isGenerating}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <ApperIcon name="Loader" size={20} className="mr-3 animate-spin" />
              Generating Website...
            </>
          ) : (
            <>
              <ApperIcon name="Zap" size={20} className="mr-3" />
              Generate Website
            </>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-panel rounded-lg p-6"
          >
            <h4 className="font-medium text-gray-100 mb-4">Generation Progress</h4>
            <ProgressBar value={progress} label={currentStep} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {generatedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-panel rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-100">Generated Files</h4>
              <Badge variant="success">{generatedFiles.length} files</Badge>
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {generatedFiles.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-2 bg-gray-800/50 rounded"
                >
                  <ApperIcon 
                    name={getFileIcon(file.type)} 
                    size={16} 
                    className="text-gray-400" 
                  />
                  <span className="text-sm font-mono text-gray-300">{file.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {downloadUrl && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-panel rounded-lg p-6"
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <ApperIcon name="Check" size={24} className="text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-100 mb-2">Website Generated Successfully!</h4>
                <p className="text-sm text-gray-400">
                  Your website package is ready for download.
                </p>
              </div>
              <Button onClick={handleDownload} variant="success" size="lg">
                <ApperIcon name="Download" size={20} className="mr-3" />
                Download {downloadUrl}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GenerationPanel;