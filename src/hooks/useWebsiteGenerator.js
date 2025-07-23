import { useState, useCallback } from "react";
import { toast } from "react-toastify";

const useWebsiteGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedFiles, setGeneratedFiles] = useState([]);

  const generateWebsite = useCallback(async (businessInfo, services, areas, config) => {
    setIsGenerating(true);
    setProgress(0);
    setGeneratedFiles([]);

    try {
      // Step 1: Generate HTML files
      setProgress(20);
      const htmlFiles = await generateHTMLFiles(businessInfo, services, areas, config);
      setGeneratedFiles(prev => [...prev, ...htmlFiles]);

      // Step 2: Generate CSS and JS
      setProgress(50);
      const assetFiles = await generateAssetFiles(config);
      setGeneratedFiles(prev => [...prev, ...assetFiles]);

      // Step 3: Generate SEO files
      setProgress(80);
      const seoFiles = await generateSEOFiles(businessInfo, services, areas);
      setGeneratedFiles(prev => [...prev, ...seoFiles]);

      // Step 4: Create ZIP package
      setProgress(100);
      const zipBlob = await createZipPackage([...htmlFiles, ...assetFiles, ...seoFiles]);
      
      return zipBlob;
    } catch (error) {
      toast.error("Generation failed: " + error.message);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const generateHTMLFiles = async (businessInfo, services, areas, config) => {
    // Mock HTML generation - in real implementation, this would call AI APIs
    await delay(1000);
    
    const files = [
      {
        name: "index.html",
        content: generateIndexHTML(businessInfo, services, areas, config),
        type: "html"
      }
    ];

    if (config.pageType === "multi") {
      // Generate service pages
      services.forEach(service => {
        files.push({
          name: `services/${service.slug}.html`,
          content: generateServiceHTML(service, businessInfo, config),
          type: "html"
        });
      });

      // Generate area pages
      areas.forEach(area => {
        files.push({
          name: `${config.areaPageSlug || "areas"}/${area.slug}.html`,
          content: generateAreaHTML(area, businessInfo, config),
          type: "html"
        });
      });
    }

    return files;
  };

  const generateAssetFiles = async (config) => {
    await delay(500);
    
    return [
      {
        name: "main.js",
        content: generateMainJS(),
        type: "js"
      },
      {
        name: "custom.css",
        content: generateCustomCSS(config.colors),
        type: "css"
      },
      {
        name: ".htaccess",
        content: generateHtaccess(),
        type: "txt"
      }
    ];
  };

  const generateSEOFiles = async (businessInfo, services, areas) => {
    await delay(300);
    
    return [
      {
        name: "sitemap.xml",
        content: generateSitemap(businessInfo, services, areas),
        type: "xml"
      },
      {
        name: "robots.txt",
        content: generateRobotsTxt(),
        type: "txt"
      },
      {
        name: "llm.txt",
        content: generateLLMTxt(businessInfo),
        type: "txt"
      }
    ];
  };

  const createZipPackage = async (files) => {
    // Mock ZIP creation - in real implementation, use JSZip
    await delay(500);
    return new Blob(["mock zip content"], { type: "application/zip" });
  };

  // Mock HTML generators
  const generateIndexHTML = (businessInfo, services, areas, config) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${businessInfo.name} - ${businessInfo.niche} in ${businessInfo.city}</title>
    <meta name="description" content="${businessInfo.description}">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="custom.css">
</head>
<body>
    <header class="bg-white shadow-lg sticky top-0 z-50">
        <nav class="container mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-bold" style="color: ${config.colors.primary}">${businessInfo.name}</h1>
                <div class="hidden md:flex space-x-6">
                    <a href="#home" class="nav-link">Home</a>
                    <a href="#about" class="nav-link">About</a>
                    <a href="#services" class="nav-link">Services</a>
                    <a href="#areas" class="nav-link">Areas</a>
                    <a href="#contact" class="nav-link">Contact</a>
                </div>
                <a href="tel:${businessInfo.phone}" class="btn-primary">${businessInfo.phone}</a>
            </div>
        </nav>
    </header>

    <main>
        <section id="home" class="hero bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-5xl font-bold mb-4">Professional ${businessInfo.niche}</h2>
                <p class="text-xl mb-8">${businessInfo.description}</p>
                <a href="#contact" class="btn-secondary">Get Free Quote</a>
            </div>
        </section>

        <section id="services" class="py-16">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12">Our Services</h2>
                <div class="grid md:grid-cols-3 gap-8">
                    ${services.map(service => `
                    <div class="service-card">
                        <h3 class="text-xl font-semibold mb-4">${service.name}</h3>
                        <p>Professional ${service.name.toLowerCase()} services in ${businessInfo.city}</p>
                    </div>
                    `).join("")}
                </div>
            </div>
        </section>
    </main>

    <script src="main.js"></script>
</body>
</html>`;
  };

  const generateServiceHTML = (service, businessInfo, config) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${service.name} - ${businessInfo.name}</title>
    <meta name="description" content="Professional ${service.name} services by ${businessInfo.name} in ${businessInfo.city}">
</head>
<body>
    <h1>${service.name} Services</h1>
    <p>Professional ${service.name} services in ${businessInfo.city}</p>
</body>
</html>`;
  };

  const generateAreaHTML = (area, businessInfo, config) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${businessInfo.niche} in ${area.name} - ${businessInfo.name}</title>
    <meta name="description" content="Professional ${businessInfo.niche} services in ${area.name} by ${businessInfo.name}">
</head>
<body>
    <h1>${businessInfo.niche} in ${area.name}</h1>
    <p>We provide professional ${businessInfo.niche} services in ${area.name}</p>
</body>
</html>`;
  };

  const generateMainJS = () => {
    return `// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});`;
  };

  const generateCustomCSS = (colors) => {
    return `/* Custom CSS */
:root {
    --primary-color: ${colors.primary};
    --secondary-color: ${colors.secondary};
    --accent-color: ${colors.accent};
}

.btn-primary {
    background-color: var(--primary-color);
    color: white;
    padding: 12px 24px;
    border-radius: 6px;
    font-weight: 500;
    text-decoration: none;
    display: inline-block;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    opacity: 0.9;
    transform: translateY(-2px);
}

.btn-secondary {
    background-color: var(--secondary-color);
    color: white;
    padding: 16px 32px;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    display: inline-block;
    transition: all 0.3s ease;
}

.nav-link {
    color: #374151;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.nav-link:hover {
    color: var(--primary-color);
}

.service-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.service-card:hover {
    transform: translateY(-4px);
}`;
  };

  const generateSitemap = (businessInfo, services, areas) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://${businessInfo.websiteSlug}.netlify.app/</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    ${services.map(service => `
    <url>
        <loc>https://${businessInfo.websiteSlug}.netlify.app/services/${service.slug}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    `).join("")}
    ${areas.map(area => `
    <url>
        <loc>https://${businessInfo.websiteSlug}.netlify.app/${businessInfo.areaPageSlug}/${area.slug}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    `).join("")}
</urlset>`;
  };

  const generateRobotsTxt = () => {
    return `User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap.xml`;
  };

  const generateLLMTxt = (businessInfo) => {
    return `# ${businessInfo.name}

This website was generated by SiteForge Pro, an AI-powered static website generator.

## Business Information
- Name: ${businessInfo.name}
- Company: ${businessInfo.company}
- Location: ${businessInfo.city}
- Phone: ${businessInfo.phone}
- Niche: ${businessInfo.niche}

## Description
${businessInfo.description}

Generated on: ${new Date().toISOString()}`;
  };

  const generateHtaccess = () => {
    return `# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static files
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/x-javascript "access plus 1 month"
</IfModule>`;
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  return {
    isGenerating,
    progress,
    generatedFiles,
    generateWebsite
  };
};

export default useWebsiteGenerator;