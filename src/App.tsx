
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
