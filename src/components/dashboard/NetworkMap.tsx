
import React from 'react';
import { WifiIcon, Server, Laptop, Smartphone, Tablet, Router } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NetworkMap: React.FC = () => {
  return (
    <Card className="security-card col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Network Map</CardTitle>
        <WifiIcon className="h-5 w-5 text-security-DEFAULT" />
      </CardHeader>
      <CardContent className="relative">
        <div className="w-full h-[300px] relative flex items-center justify-center">
          {/* Radar animation */}
          <div className="w-60 h-60 rounded-full border border-security-DEFAULT/30 relative flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border border-security-DEFAULT/30 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border border-security-DEFAULT/30 flex items-center justify-center">
                <div className="radar-indicator animate-radar-scan"></div>
                <div className="z-10 bg-security-DEFAULT/20 w-10 h-10 rounded-full flex items-center justify-center">
                  <Router className="h-6 w-6 text-security-light" />
                </div>
              </div>
              
              {/* Connected devices */}
              <div className="absolute top-6 left-12 animate-pulse-slow">
                <Laptop className="h-6 w-6 text-security-light" />
              </div>
              <div className="absolute top-12 right-2 animate-pulse-slow">
                <Smartphone className="h-5 w-5 text-security-danger" />
              </div>
              <div className="absolute bottom-4 right-12 animate-pulse-slow">
                <Server className="h-6 w-6 text-security-light" />
              </div>
              <div className="absolute bottom-10 left-5 animate-pulse-slow">
                <Tablet className="h-5 w-5 text-security-light" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkMap;
