
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import Statistics from "./pages/Statistics";
import NotFound from "./pages/NotFound";
import DevicesPage from "./pages/DevicesPage";
import NetworkPage from "./pages/NetworkPage";
import SecurityPage from "./pages/SecurityPage";
import ThreatsPage from "./pages/ThreatsPage";
import MonitoringPage from "./pages/MonitoringPage";
import HelpPage from "./pages/HelpPage";
import SettingsPage from "./pages/SettingsPage";
import { apiService } from "./services/apiService";

// Create the query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Initialize app settings
const initializeAppSettings = () => {
  // Load scanning settings
  const scanningSettings = localStorage.getItem('scanningSettings');
  if (scanningSettings) {
    const settings = JSON.parse(scanningSettings);
    apiService.setConfig({
      autoScan: settings.autoScan,
      scanInterval: parseInt(settings.scanInterval || '12'),
      deepScan: settings.deepScan,
      scanPorts: settings.scanPorts,
      osDetection: settings.osDetection
    });
  }

  // Load security settings
  const securitySettings = localStorage.getItem('securitySettings');
  if (securitySettings) {
    const settings = JSON.parse(securitySettings);
    apiService.setSecurityConfig({
      autoBlock: settings.autoBlock,
      threatAnalysis: settings.threatAnalysis,
      saveHistory: settings.saveHistory,
      anonymousData: settings.anonymousData
    });
  }

  // Apply display settings to document
  const displaySettings = localStorage.getItem('displaySettings');
  if (displaySettings) {
    const settings = JSON.parse(displaySettings);
    if (settings.compactView) {
      document.body.classList.add('compact-view');
    } else {
      document.body.classList.remove('compact-view');
    }
  }
};

const AppContent = () => {
  useEffect(() => {
    // Initialize app settings when component mounts
    initializeAppSettings();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/devices" element={<DevicesPage />} />
      <Route path="/network" element={<NetworkPage />} />
      <Route path="/security" element={<SecurityPage />} />
      <Route path="/threats" element={<ThreatsPage />} />
      <Route path="/monitoring" element={<MonitoringPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
