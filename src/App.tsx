import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import React from "react";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary";
import Analytics from "./components/Analytics";
import Index from "./pages/Index";
import Resume from "./pages/Resume";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Test from "./pages/Test";
import NotFound from "./pages/NotFound";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import Skills from "./pages/Skills";
import Activities from "./pages/Activities";
import OpenSource from "./pages/OpenSource";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";

// Import React Three Fiber with React explicitly available
const ThreeDSkills = lazy(async () => {
  // Ensure React is available before importing React Three Fiber
  // React Three Fiber needs React to be fully initialized
  await Promise.resolve(); // Ensure we're in async context
  if (typeof window !== 'undefined') {
    // Ensure React is on window if needed
    if (!(window as any).React && React) {
      (window as any).React = React;
    }
  }
  return import("./pages/test/ThreeDSkills");
});

const FaceModel3D = lazy(async () => {
  await Promise.resolve();
  if (typeof window !== 'undefined') {
    if (!(window as any).React && React) {
      (window as any).React = React;
    }
  }
  return import("./pages/test/FaceModel3D");
});

const GitHubHeatmap = lazy(() => import("./pages/test/GitHubHeatmap"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <Analytics />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/test" element={<Test />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/education" element={<Education />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/opensource" element={<OpenSource />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/contact" element={<Contact />} />
              <Route 
                path="/test/3d-skills" 
                element={
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center bg-paper-cream dark:bg-background">
                      <div className="text-center">
                        <div className="inline-block w-8 h-8 border-2 border-black dark:border-foreground border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-black dark:text-foreground font-serif">Loading 3D visualization...</p>
                      </div>
                    </div>
                  }>
                    <ThreeDSkills />
                  </Suspense>
                } 
              />
              <Route 
                path="/test/face-model" 
                element={
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center bg-paper-cream dark:bg-background">
                      <div className="text-center">
                        <div className="inline-block w-8 h-8 border-2 border-black dark:border-foreground border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-black dark:text-foreground font-serif">Loading 3D face model...</p>
                      </div>
                    </div>
                  }>
                    <FaceModel3D />
                  </Suspense>
                } 
              />
              <Route 
                path="/test/github-heatmap" 
                element={
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center bg-paper-cream dark:bg-background">
                      <div className="text-center">
                        <div className="inline-block w-8 h-8 border-2 border-black dark:border-foreground border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-black dark:text-foreground font-serif">Loading GitHub heatmap...</p>
                      </div>
                    </div>
                  }>
                    <GitHubHeatmap />
                  </Suspense>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </ErrorBoundary>
  </HelmetProvider>
);

export default App;
