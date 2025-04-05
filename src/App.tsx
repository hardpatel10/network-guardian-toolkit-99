
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import DevicesPage from '@/pages/DevicesPage';
import ThreatsPage from '@/pages/ThreatsPage';
import NetworkPage from '@/pages/NetworkPage';
import MonitoringPage from '@/pages/MonitoringPage';
import SecurityPage from '@/pages/SecurityPage';
import SettingsPage from '@/pages/SettingsPage';
import Statistics from '@/pages/Statistics';
import HelpPage from '@/pages/HelpPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/devices" element={<DevicesPage />} />
            <Route path="/threats" element={<ThreatsPage />} />
            <Route path="/network" element={<NetworkPage />} />
            <Route path="/monitoring" element={<MonitoringPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
