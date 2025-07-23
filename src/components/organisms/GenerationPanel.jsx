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
  onGenerate,
  isGenerating: externalIsGenerating,
  error: externalError
}) => {
const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [generatedFiles, setGeneratedFiles] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [previewHtml, setPreviewHtml] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // Use external state if provided
  const actualIsGenerating = externalIsGenerating !== undefined ? externalIsGenerating : isGenerating;
  const actualError = externalError || null;
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
      setPreviewHtml("");
      setShowPreview(true);

      // Real AI-powered generation process
      if (onGenerate) {
        const zipBlob = await onGenerate((progress, step) => {
          setProgress(progress);
          setCurrentStep(step);
          
          // Simulate file creation for UI feedback
          if (progress >= 20 && generatedFiles.length === 0) {
            setGeneratedFiles([
              { name: "index.html", type: "html" },
              { name: "custom.css", type: "css" },
              { name: "main.js", type: "js" }
            ]);
          }
          
          if (progress >= 60 && config.pageType === 'multi') {
            setGeneratedFiles(prev => [
              ...prev,
              ...services.map(service => ({ name: `services/${service.slug}.html`, type: "html" })),
              ...areas.map(area => ({ name: `service-areas/${area.slug}.html`, type: "html" }))
            ]);
          }
          
          if (progress >= 90) {
            setGeneratedFiles(prev => [
              ...prev,
              { name: "sitemap.xml", type: "xml" },
              { name: "robots.txt", type: "txt" },
              { name: ".htaccess", type: "txt" }
            ]);
          }
        });

        // Generate preview HTML for display
        const mockPreviewHtml = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${businessInfo.name} - ${businessInfo.niche}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, ${config.colors.primary}, ${config.colors.secondary}); color: white; }
              .container { max-width: 800px; margin: 0 auto; text-align: center; }
              h1 { font-size: 2.5rem; margin-bottom: 1rem; }
              p { font-size: 1.2rem; margin-bottom: 2rem; }
              .services { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 2rem 0; }
              .service { background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>${businessInfo.name}</h1>
              <p>${businessInfo.description}</p>
              <div class="services">
                ${services.map(service => `<div class="service"><h3>${service.name}</h3></div>`).join('')}
              </div>
              <p>📍 Serving ${areas.map(area => area.name).join(', ')}</p>
              <p>📞 ${businessInfo.phone}</p>
            </div>
          </body>
          </html>
        `;
        setPreviewHtml(mockPreviewHtml);
        setDownloadUrl(`${businessInfo.websiteSlug || "website"}.zip`);
      }
      
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
      <div className={`grid gap-6 ${showPreview ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Main Generation Panel */}
        <div className="space-y-6">
          <div className="glass-panel rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-100">Generation Summary</h3>
              {showPreview && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowPreview(false)}
                  className="lg:hidden"
                >
                  <ApperIcon name="X" size={16} />
                </Button>
              )}
            </div>
            
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
              disabled={!isReadyToGenerate || actualIsGenerating}
              className="w-full"
              size="lg"
            >
              {actualIsGenerating ? (
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
            {actualIsGenerating && (
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
        </div>

        {/* Preview Panel */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-panel rounded-lg p-6 lg:sticky lg:top-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-100 flex items-center gap-2">
                  <ApperIcon name="Monitor" size={16} />
                  Website Preview
                </h4>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      if (previewHtml) {
                        const blob = new Blob([previewHtml], { type: 'text/html' });
                        const url = URL.createObjectURL(blob);
                        window.open(url, '_blank');
                        setTimeout(() => URL.revokeObjectURL(url), 1000);
                      }
                    }}
                    disabled={!previewHtml}
                    title="Open in new tab"
                  >
                    <ApperIcon name="ExternalLink" size={14} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowPreview(false)}
                  >
                    <ApperIcon name="X" size={14} />
                  </Button>
                </div>
              </div>

              <div className="relative bg-white rounded-lg overflow-hidden" style={{ aspectRatio: '16/10' }}>
                {previewHtml ? (
                  <iframe
                    srcDoc={previewHtml}
                    className="w-full h-full border-0"
                    title="Website Preview"
                    sandbox="allow-same-origin allow-scripts"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
<div className="text-center text-gray-500">
                      <ApperIcon name="Monitor" size={48} className="mx-auto mb-3 opacity-50" />
                      <p className="text-sm">
                        {actualIsGenerating ? "Generating preview..." : "Preview will appear here"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {actualIsGenerating && (
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center gap-2 text-sm text-gray-400">
                    <ApperIcon name="Loader" size={14} className="animate-spin" />
                    Updating preview...
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default GenerationPanel;